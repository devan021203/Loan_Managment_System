from rest_framework import serializers
from .models import LoanApplication

class LoanSerializer(serializers.ModelSerializer):

    class Meta:
        model = LoanApplication
        fields = '__all__'

        read_only_fields = ['user', 'user_loan_id']  # ✅ ADD THIS