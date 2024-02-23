from django.conf import settings
import requests as r

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class GOLFLeaderboardViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'], permission_classes=[AllowAny], url_path='leaderboard')
    def leaderboard(self, request):
        url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25"
        headers = {
            "X-RapidAPI-Key": settings.GOLF_API_KEY,
            "X-RapidAPI-Host": "golf-leaderboard-data.p.rapidapi.com"
        }
        try:
            response = r.get(url, headers=headers)
            data = response.json()
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Failed to fetch leaderboard data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)