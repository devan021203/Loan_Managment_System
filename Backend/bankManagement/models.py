from django.contrib.auth.models import User
from django.db import models

class LoanApplication(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_loan_id = models.IntegerField() 

    # user_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    amount = models.FloatField()

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)