from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load experiments data
def load_experiments():
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'experiments.json')
    with open(data_path, 'r') as f:
        return json.load(f)

@app.get("/experiments")
def get_experiments():
    experiments = load_experiments()
    return experiments['experiments']

@app.get("/experiment/{experiment_name}")
def get_experiment_methods(experiment_name: str):
    experiments = load_experiments()
    for experiment in experiments['experiments']:
        if experiment['name'].lower() == experiment_name.lower():
            return experiment['methods']
    raise HTTPException(status_code=404, detail="Experiment not found")

@app.get("/method/{method_name}")
def get_method_details(method_name: str):
    experiments = load_experiments()
    for experiment in experiments['experiments']:
        for method in experiment['methods']:
            if method['method_name'].lower() == method_name.lower():
                return method
    raise HTTPException(status_code=404, detail="Method not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)