# Vector C2 (Command/Control Center)

![Vector C2](./src/img/cc-logo-black.png "Vector Command/Control Center")

The idea behind Vector C2 project emerged when I realized that although Anki Vector is much more versatile than Anki Cosmo, it misses one single bit: a graphical, block based way for writing simple programs to control Anki Vector. If you have smaller children who love Anki Vector and would like to tell him what to do, but can't program in Python (usually and obviously) they will love Blockly-powered Vector C2 programming interface.

## Installing Vector C2

1. You will need Python 3.7+.
1. Checkout out source code from [github](https://github.com/sebastiankruk/vectorc2):
    ```bash
    git clone https://github.com/sebastiankruk/vectorc2.git
    ```
1. Prepare virtual environment:
    ```bash
    virtualenv -p /usr/local/bin/python3 --no-site-packages .env
    ```
1. Start using virtual environment:
    ```bash
    source .env/bin/activate
    ```
1. Install requirements:
    ```bash
    pip install -r requirements.txt
    ```
1. Install [redis](https://redis.io/).
1. [Run Redis](https://redis.io/topics/quickstart):
    ```bash
    redis-server
    ```
1. Run Vector C2 server:
    ```bash
    cd vectorc2
    python manage.py runserver
    ```