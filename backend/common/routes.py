from .views import RestViewSet
from leaderboard.views import GOLFLeaderboardViewSet


routes = [
    {   "regex": r"rest", 
        "viewset": RestViewSet, 
        "basename": "Rest"
    },
    {
        "regex": r'leaderboard',
        "viewset": GOLFLeaderboardViewSet,
        "basename": 'leaderboard'
    },
]
