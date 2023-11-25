pip install -t lib -r requirements.txt

(cd lib; zip ../lambda_function.zip -r .)

zip lambda_function.zip -u main.py
zip lambda_function.zip -u app/lib/utils.py 
zip lambda_function.zip -u app/routes/pdf.py 