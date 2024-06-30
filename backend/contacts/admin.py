from django.contrib import admin
from django.contrib import admin
from django.utils.html import format_html
from contacts.models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = [
        "avatar_preview",
        "first_name",
        "last_name",
        "email",
        "birthdate",
        "language",
        "gender",
    ]

    list_display_links = ["first_name"]
    list_editable = ["language"]

    def avatar_preview(self, obj):

        return format_html(
            """<div style="display: flex; align-items: center; gap: 4px">
                <img style='width: 50px; height: 50px; border-radius: 50%;object-fit: cover' src='http://localhost:8000/media/{}'/>
            </div>""",
            str(obj.avatar),
        )

    avatar_preview.short_description = "Imagem"
