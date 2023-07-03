"""Validate login functionality By passing invalid,, null and valid data"""
import os
import time

import allure
import pytest
from tests import BaseTestClass
from pages.authentication.login_page import LoginPageClass
from selenium.webdriver.common.by import By


@allure.epic("Authentication")
@allure.suite("Student Login")
@allure.feature("Login")
@allure.description("Test cases for login via student")
@pytest.mark.usefixtures("setup")
class StudentLoginClass(BaseTestClass):
    _SIGNIN_LINK_LOCATOR = (By.LINK_TEXT, 'Sign in')
    _EMAIL_INPUT_LOCATOR = (By.ID, 'email')
    _CONTINUE_BUTTON_LOCATOR = (By.ID, 'ms_singin_email')
    _CONTINUE_WITH_GOOGLE_BUTTON_LOCATOR = (By.ID, 'ms_continue_with_google')
    _SIGNUP_LINK_LOCATOR = (By.LINK_TEXT, 'Sign up')
    _PASSWORD_INPUT_LOCATOR = (By.ID, 'password')
    _FORGOT_PASSWORD_LINK_LOCATOR = (By.LINK_TEXT, 'Forgot Password?')
    _SIGNIN_BUTTON_LOCATOR = (By.ID, 'ms_singin_email')

    @pytest.fixture(autouse=True)
    def _setup(self):
        self.login_page_tab_instance = LoginPageClass(self.driver)

    @allure.title("Entering login url should show login page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.0)
    def test_visit_login_page(self):
        link = os.getenv("LOGIN_LINK")
        self.login_page_tab_instance.go_to_page(link)
        assert link in self.login_page_tab_instance.get_current_url()

    # @allure.title("Verifying clicking on login button should redirect to sign in page.")
    # @allure.severity(allure.severity_level.CRITICAL)
    # @pytest.mark.low
    # @pytest.mark.order(1.1)
    # def test_title_login_button_is_working(self):
    #     assert self.login_page_tab_instance.click_on_login_button()

    @allure.title("Clicking on signin button should redirect user to login form")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_signin_link_is_working(self):
        assert self.login_page_tab_instance.click_on_signin_link()

    @allure.title("Verifying email input field is available, Email input should be exist on the page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.2)
    def test_email_input_is_exist(self):
        assert self.login_page_tab_instance.check_page_element()

    @allure.title("Verifying continue_with_google button is available on login page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.3)
    def test_continue_with_google_button_is_exist(self):
        assert self.login_page_tab_instance.check_page_element()

    @allure.title("Checking Sign Up link is exist on the same page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.4)
    def test_signup_link_is_exist(self):
        assert self.login_page_tab_instance.check_page_element()

    @allure.title("Verifying Email input is enterable.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.5)
    def test_email_input_is_enterable(self):
        _EMAIL_INPUT_VALUE = os.getenv("LOGIN_EMAIL")
        assert self.login_page_tab_instance.enter_field_input(self._EMAIL_INPUT_LOCATOR, _EMAIL_INPUT_VALUE)

    @allure.title("Checking continue button is clickable after entering email.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.6)
    def test_continue_button_is_working(self):
        assert self.login_page_tab_instance.click_on_element(self._CONTINUE_BUTTON_LOCATOR)

    @allure.title("Verifying forgot_password link is available on password section.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.7)
    def test_forgot_password_link_is_exist(self):
        assert self.login_page_tab_instance.check_page_element(self._FORGOT_PASSWORD_LINK_LOCATOR)

    @allure.title("Checking password input is available on the page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.7)
    def test_password_input_is_exist(self):
        assert self.login_page_tab_instance.check_page_element(self._PASSWORD_INPUT_LOCATOR)

    @allure.title("Verifying password input can be filled or not, user should be able to enter password.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.8)
    def test_password_input_is_enterable(self):
        _PASSWORD_INPUT_VALUE = os.getenv("LOGIN_PASSWORD")
        assert self.login_page_tab_instance.enter_field_input(self._PASSWORD_INPUT_LOCATOR, _PASSWORD_INPUT_VALUE)

    @allure.title("Checking signin button is clickable after entering password.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.9)
    def test_signin_button_is_clickable(self):
        assert self.login_page_tab_instance.click_on_element(self._SIGNIN_BUTTON_LOCATOR)

    @allure.title("Verifying after login user is redirecting to dashboard.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.10)
    def test_dashboard_url_after_login(self):
        _DASHBOARD_URL_LINK = os.getenv("DASHBOARD_URL")
        assert self.login_page_tab_instance.check_page_url(_DASHBOARD_URL_LINK)
