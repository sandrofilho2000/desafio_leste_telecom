from django.db import models
import uuid


class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    GENDER_CHOICES = [
        ("M", "Masculino"),
        ("F", "Feminino"),
    ]

    first_name = models.CharField(max_length=100, verbose_name="Nome")
    last_name = models.CharField(max_length=100, verbose_name="Sobrenome")
    email = models.CharField(max_length=100, verbose_name="E-mail")
    language = models.CharField(max_length=100, verbose_name="Idioma")
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, verbose_name="Gênero"
    )
    birthdate = models.DateField(verbose_name="Data de Nascimento")
    avatar = models.ImageField(
        upload_to="",
        null=True,
        default="default_user.webp",
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "Contato"
        verbose_name_plural = "Contatos"
