from django.urls import path
from .views import apply_loan, get_loans,login_user,delete_loan,update_loan

urlpatterns = [
    path('apply/', apply_loan),
    path('all/', get_loans),
    path('login/', login_user),
    path('delete/<int:id>/', delete_loan),
    path('update/<int:id>/', update_loan),
]