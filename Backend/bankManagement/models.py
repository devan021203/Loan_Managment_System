from django.db import models

class LoanApplication(models.Model):
    userId = models.IntegerField()
    amount = models.FloatField()
    status = models.CharField(max_length=50, default='Pending')