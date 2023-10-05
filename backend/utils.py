import torch.nn as nn
    
class ApartmentModel(nn.Module):
    def __init__(self, num_features):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(num_features, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 64),
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 16),
            nn.BatchNorm1d(16),
            nn.ReLU(),
            nn.Linear(16, 1)
        )

    def forward(self, x):
        return self.layers(x)

def save_model(model):
    from torch import save
    from os import path, listdir
    num_files = len(listdir(path.join(path.dirname(__file__), 'models')))
    save(model.state_dict(), path.join(path.dirname(__file__), 'models', 'model{}.pth'.format(num_files)))