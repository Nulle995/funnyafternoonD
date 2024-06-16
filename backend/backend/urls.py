from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", TokenObtainPairView.as_view(), name="token"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("apoderados/", include("apoderados.urls")),
    path("estudiantes/", include("est.urls")),
    path("planes/", include("planes.urls")),
    path("inscripciones/", include("inscripciones.urls")),
    path("asistencia/", include("asistencia.urls")),
    path("transacciones/", include("transacciones.urls")),
    path("eventos/", include("eventos.urls")),
]
