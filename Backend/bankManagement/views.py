from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoanApplication
from .serializer import LoanSerializer 
from django.contrib.auth import authenticate

@api_view(['POST'])
def apply_loan(request):
    serializer = LoanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Loan Applied'})
    print(serializer.errors)   
    return Response(serializer.errors)

@api_view(['GET'])
def get_loans(request):
    loans = LoanApplication.objects.all()
    serializer = LoanSerializer(loans, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:

        # IMPORTANT: role logic
        role = "admin" if user.is_superuser else "user"

        return Response({
            "message": "Login Success",
            "role": role,
            "username": user.username
        })

    return Response({"error": "Invalid credentials"}, status=400)

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