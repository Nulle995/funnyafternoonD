from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        return Response(
            {"message": "User created successfully."},
            status=status.HTTP_201_CREATED,
        )
