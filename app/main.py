from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import routes, models
from app.database import engine

app = FastAPI()

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

# Inclui as rotas
app.include_router(routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)