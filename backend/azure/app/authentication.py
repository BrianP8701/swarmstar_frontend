import jwt
from datetime import datetime, timedelta
from azure.functions import HttpRequest, HttpResponse
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

def login(req: HttpRequest) -> HttpResponse:
    # Generate a JWT token (simplified example)
    secret_key = "your_secret_key"
    token_expiry = datetime.utcnow() + timedelta(days=1)
    token = jwt.encode({'user': 'username', 'exp': token_expiry}, secret_key, algorithm="HS256")

    # Set the token in a cookie
    headers = {
        'Set-Cookie': f'token={token}; HttpOnly; Path=/; Expires={token_expiry.strftime("%a, %d-%b-%Y %H:%M:%S GMT")}'
    }
    return HttpResponse("Logged in successfully", headers=headers)


def authenticate(req: HttpRequest) -> HttpResponse:
    # Extract the token from the cookie
    cookies = req.headers.get('Cookie')
    token = None
    if cookies:
        for cookie in cookies.split(';'):
            if cookie.strip().startswith('token='):
                token = cookie.split('=')[1]
                break

    secret_key = "your_secret_key"

    try:
        # Assuming 'encoded_token' is the JWT token you received in the request
        decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])
        username = decoded_token.get('user')
        # Now you can use 'username' or other data from the token as needed
    except ExpiredSignatureError:
        pass
        # Handle expired token
    except InvalidTokenError:
        pass
        # Handle invalid token
        
                    
    if not token:
        return HttpResponse("Unauthorized", status_code=401)

    # Here you would validate the token...
    # For simplicity, assuming validation passes

    return HttpResponse("Token is valid", status_code=200)
