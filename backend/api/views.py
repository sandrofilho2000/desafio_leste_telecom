from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from contacts.models import Contact
from contacts.serializers import ContactSerializer
from django.views import View
import calendar
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CSRFTokenView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"detail": "CSRF cookie set"})


@method_decorator(csrf_exempt, name="dispatch")
class CreateContactView(View):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)

            new_contact = Contact(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                email=data.get("email"),
                birthdate=data.get("birthdate"),
                gender=data.get("gender"),
                language=data.get("language"),
            )
            new_contact.save()

            print("new_contact: ", data)

            return JsonResponse({"message": "Contact saved successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@method_decorator(csrf_exempt, name="dispatch")
class UpdateContactView(View):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            contact_id = kwargs.get("id")

            try:
                contact = Contact.objects.get(id=contact_id)
            except Contact.DoesNotExist:
                return JsonResponse({"error": "Contact not found"}, status=404)

            contact.first_name = data.get("first_name", contact.first_name)
            contact.last_name = data.get("last_name", contact.last_name)
            contact.email = data.get("email", contact.email)
            contact.birthdate = data.get("birthdate", contact.birthdate)
            contact.gender = data.get("gender", contact.gender)
            contact.language = data.get("language", contact.language)
            contact.save()

            return JsonResponse({"message": "Contact updated successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


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
