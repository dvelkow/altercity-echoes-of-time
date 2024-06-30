import torch
import numpy as np
from dataclasses import dataclass

@dataclass
class CityStats:
    year: int
    population: int
    happiness: float
    economy: float
    technology: float
    environment: float
    culture: float
    infrastructure: float

    def __post_init__(self):
        # Convert all stats to PyTorch tensors
        for field in self.__dataclass_fields__:
            if field != 'year':
                setattr(self, field, torch.tensor(getattr(self, field), dtype=torch.float32))

    def update(self, decisions):
        # This method will be called to update the city stats based on decisions
        # For now, we'll implement a simple random change
        for field in self.__dataclass_fields__:
            if field != 'year':
                current_value = getattr(self, field)
                change = torch.randn(1) * 0.1  # Random change between -10% and 10%
                new_value = current_value * (1 + change)
                setattr(self, field, new_value.clamp(0, 100))  # Ensure values stay between 0 and 100

        self.year += 1

    def to_dict(self):
        return {field: getattr(self, field).item() if field != 'year' else getattr(self, field) 
                for field in self.__dataclass_fields__}

def initialize_city():
    return CityStats(
        year=2000,
        population=1_000_000,
        happiness=70.0,
        economy=60.0,
        technology=50.0,
        environment=80.0,
        culture=65.0,
        infrastructure=55.0
    )

def save_city_state(city, filename):
    torch.save(city.to_dict(), filename)

def load_city_state(filename):
    data = torch.load(filename)
    return CityStats(**data)