## Setup

1.  `git clone <project_url>`
1.  `python3 -m pip install --upgrade pip`
1.  `pip install pipenv`
1.  To activate this project's virtualenv firsttime, run the following:

        pipenv shell

1.  Install the dependencies

        pipenv install --dev

1.  Install a new production package

        pipenv install <package_name>

1.  Install a new development package

        pipenv install <package_name> --dev

1.  Find all outdated packages

        pipenv update --outdated

1.  Update packages

        pipenv update OR pipenv update <package_name>

## Running the tests

        pytest -n <number_of_workers> --browser=chrome --client=onwards --env=production --logging=DEBUG --headless=false

Example:-
## Running test cases for onwards
pytest -v -s --browser=chrome --client=Onwards --env=production --logging=DEBUG --headless=false tests/authentication/login/onwards/test_login.py

## Running test cases for onwards(Dashboard)
        pytest -v -s --browser=chrome --client=Onwards --env=production --logging=DEBUG --headless=false tests/dashboard/masai_dashboard/onwards/test_dashboard.py


## Running test casesfor CareerMentorhip authentication
        pytest -v -s --browser=chrome --client=Onwards --env=production --logging=DEBUG --headless=false tests/career_mentorship/authentication/onwards/test_authentication.py

## CareerMentorship authentication allure test report
        https://career-mentorship-authentication.netlify.app/

## Running test cases for Cap flow by ineligible users
        pytest -v -s --browser=chrome --client=Onwards --env=production --logging=DEBUG --headless=false tests/cap/ineligible/onwards/test_cap.py


## Running test cases for cross login validation
        pytest -v -s --browser=chrome --client=Onwards --env=production --logging=DEBUG --headless=false tests/authentication/cross_login/onwards/test_cross_login.py
