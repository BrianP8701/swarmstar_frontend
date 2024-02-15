


def configure_routes(app):
    from .auth.login import login_route
    from .auth.signup import signup_route
    from .auth.auth_token import auth_token_route
    from .spawn.delete_swarm import delete_swarm_route
    from .spawn.get_swarm import set_swarm_route
    from .spawn.spawn_swarm import spawn_swarm_route
    from .spawn.create_swarm import create_swarm_route

    app.register_blueprint(login_route)
    app.register_blueprint(signup_route)
    app.register_blueprint(auth_token_route)
    app.register_blueprint(delete_swarm_route)
    app.register_blueprint(set_swarm_route)
    app.register_blueprint(spawn_swarm_route)
    app.register_blueprint(create_swarm_route)
    