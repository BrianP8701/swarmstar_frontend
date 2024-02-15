

def backend_user_to_frontend_user(backend_user):
    frontend_user = backend_user
    frontend_user.pop('password')
    frontend_user.pop('openai_key')
    return frontend_user

