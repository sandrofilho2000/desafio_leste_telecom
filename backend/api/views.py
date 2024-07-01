from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from contacts.models import Contact
from contacts.serializers import ContactSerializer
import calendar


class ContactDetailView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        slug = request.query_params.get("slug")
        gender = request.query_params.get("gender")
        language = request.query_params.get("language")
        birth_month = request.query_params.get("birthMonth")
        birth_month_number = 0
        if birth_month:
            try:
                birth_month_number = list(calendar.month_name).index(
                    birth_month.capitalize()
                )
            except ValueError:
                pass

        if slug:
            queryset = queryset.filter(slug__icontains=slug)
        if gender:
            queryset = queryset.filter(gender=gender)
        if language:
            queryset = queryset.filter(language__icontains=language)
        if birth_month_number:
            queryset = queryset.filter(birthdate__month=birth_month_number)

        contacts = self.get_serializer(queryset, many=True).data

        response_data = {"contacts": contacts}
        return Response(response_data)
