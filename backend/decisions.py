from dataclasses import dataclass
from typing import Dict, List


@dataclass
class Decision:
    name: str
    description: str
    effects: Dict[str, float]
    cost: int
    prerequisites: Dict[str, float] = None

class DecisionManager:
    def __init__(self):
        self.decisions = self._initialize_decisions()

    def _initialize_decisions(self) -> List[Decision]:
        return [
            Decision(
                name="Invest in Green Energy",
                description="Allocate funds to develop renewable energy sources.",
                effects={
                    "environment": 5.0,
                    "economy": -2.0,
                    "technology": 3.0,
                    "happiness": 2.0
                },
                cost=1000000
            ),
            Decision(
                name="Expand Public Transportation",
                description="Develop and improve the city's public transit system.",
                effects={
                    "infrastructure": 4.0,
                    "environment": 3.0,
                    "economy": 2.0,
                    "happiness": 3.0
                },
                cost=2000000
            ),
            Decision(
                name="Implement Education Reform",
                description="Overhaul the education system to improve its quality and accessibility.",
                effects={
                    "culture": 4.0,
                    "technology": 3.0,
                    "economy": 1.0,
                    "happiness": 2.0
                },
                cost=1500000
            ),
            Decision(
                name="Launch Urban Renewal Project",
                description="Revitalize deteriorating urban areas.",
                effects={
                    "infrastructure": 5.0,
                    "happiness": 4.0,
                    "economy": 2.0,
                    "environment": -1.0
                },
                cost=3000000
            ),
            Decision(
                name="Host International Festival",
                description="Organize a grand festival to celebrate diversity and boost tourism.",
                effects={
                    "culture": 5.0,
                    "economy": 3.0,
                    "happiness": 4.0
                },
                cost=500000
            )
        ]

    def get_available_decisions(self, city_stats):
        available = []
        for decision in self.decisions:
            if self._check_prerequisites(decision, city_stats):
                available.append(decision)
        return available

    def _check_prerequisites(self, decision, city_stats):
        if decision.prerequisites is None:
            return True
        for stat, required_value in decision.prerequisites.items():
            if getattr(city_stats, stat) < required_value:
                return False
        return True

    def apply_decision(self, decision, city_stats):
        for stat, effect in decision.effects.items():
            current_value = getattr(city_stats, stat)
            new_value = current_value + effect
            setattr(city_stats, stat, max(0, min(100, new_value)))
        city_stats.population -= decision.cost  # Assuming population represents available resources
        return city_stats