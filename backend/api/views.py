from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from contacts.models import Contact
from contacts.serializers import ContactSerializer


class ContactDetailView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        slug = request.query_params.get("slug")

        # Filter queryset based on query parameters if provided
        queryset = self.get_queryset()
        if slug:
            queryset = queryset.filter(slug__icontains=slug)

        contacts = self.get_serializer(queryset, many=True).data

        response_data = {"contacts": contacts}
        print("RESPONSE DATA: ", response_data)
        return Response(response_data)
