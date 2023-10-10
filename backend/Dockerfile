FROM python:3.10.12

WORKDIR /apartment-worth-backend

COPY /app.py /apartment-worth-backend
COPY /requirements.txt /apartment-worth-backend
COPY /model_262_18f.pth /apartment-worth-backend
COPY /utils.py /apartment-worth-backend

RUN pip install -r requirements.txt
RUN pip install torch==2.0.1+cpu -f https://download.pytorch.org/whl/torch_stable.html

ENTRYPOINT ["python"]

CMD ["app.py"]