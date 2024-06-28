from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from contacts.models import Contact
from contacts.serializers import ContactSerializer


class ContactDetailView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        if pk:
            instance = get_object_or_404(self.get_queryset(), pk=pk)
            contacts = [instance]
        else:
            instances = self.get_queryset()
            contacts = self.get_serializer(instances, many=True).data

        if not contacts:
            raise NotFound("No contacts found.")

        response_data = {"contacts": contacts}
        return Response(response_data)
