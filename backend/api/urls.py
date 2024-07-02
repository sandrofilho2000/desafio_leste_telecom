from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from api.views import CSRFTokenView, ContactDetailView, CreateContactView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/create_contact/", CreateContactView.as_view(), name="create_contact"),
    path("api/csrf_token/", CSRFTokenView.as_view(), name="csrf_token"),
    path("api/contacts", ContactDetailView.as_view(), name="site_data"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
