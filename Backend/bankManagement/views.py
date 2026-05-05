from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanApplication
from .serializer import LoanSerializer 
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils.timezone import now

@api_view(['POST'])
def apply_loan(request):

    user_id = request.data.get('user')

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=400)

    # 🔥 Get last loan number for this user
    last_loan = LoanApplication.objects.filter(user=user).order_by('-user_loan_id').first()

    if last_loan:
        next_id = last_loan.user_loan_id + 1
    else:
        next_id = 1   # first loan

    data = request.data.copy()
    data.pop('user', None)

    serializer = LoanSerializer(data=data)

    if serializer.is_valid():
        serializer.save(user=user, user_loan_id=next_id)   # ✅ IMPORTANT
        return Response({
            "message": "Loan Applied",
            "user_loan_id": next_id
        }, status=201)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_loans(request):

    user_id = request.GET.get('user_id')

    if not user_id:
        return Response({'error': 'user_id required'}, status=400)

    loans = LoanApplication.objects.filter(user_id=user_id)

    serializer = LoanSerializer(loans, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_loan(request, id):
    try:
        loan = LoanApplication.objects.get(id=id)
        loan.delete()
        return Response({"message": "Deleted successfully"}, status=200)
    except LoanApplication.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    
@api_view(['PATCH'])
def update_loan(request, id):
    try:
        loan = LoanApplication.objects.get(id=id)
    except LoanApplication.DoesNotExist:
        return Response({"error": "Loan not found"}, status=404)

    serializer = LoanSerializer(loan, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Updated successfully"})
    
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def register_user(request):
    full_name = request.data.get('full_name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not full_name or not email or not password:
        return Response({'error': 'Missing fields'}, status=400)

    # 🔥 check if user already exists
    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=400)

    # 🔥 create user properly (with hashed password)
    user = User.objects.create_user(
        username=email,   # ⚠️ login uses this
        email=email,
        password=password
    )

    user.first_name = full_name
    user.save()

    return Response({'message': 'User registered successfully'})



@api_view(['GET'])
def get_users(request):
    users = User.objects.all()

    data = []
    for user in users:
        data.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
            "last_login": user.last_login
        })

    return Response(data)


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:

        user.last_login = now()
        user.save()

        role = "admin" if user.is_superuser else "user"

        return Response({
            "message": "Login Success",
            "role": role,
            "username": user.username,
            "id": user.id   # 🔥 IMPORTANT FIX
        })

    return Response({"error": "Invalid credentials"}, status=400)