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
    @pytest.fixture(autouse=True)
    def _setup(self):
        self.login_page_tab_instance = LoginPageClass(self.driver)

    @allure.title("Entering login url should show login page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.0)
    def test_visit_login_page(self):
        link = os.getenv("HOME_URL")
        self.login_page_tab_instance.go_to_page(link)
        assert link in self.login_page_tab_instance.get_current_url()

    @allure.title("Verifying facebook login logo is visible on the page.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_facebook_login_logo_exists(self):
        assert self.login_page_tab_instance.home_logo_exists()

    @allure.title("Verifying create your account button is getting displayed on the page.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_create_your_account_button_exists(self):
        assert self.login_page_tab_instance.create_your_account_button_exists()

    @allure.title("Verifying create your account button works.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_create_your_account_button_works(self):
        assert self.login_page_tab_instance.create_your_account_button_works()

    @allure.title("Verifying on-clicking create your account button, sign up is visible on the page.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_sign_up_form_is_visible(self):
        assert self.login_page_tab_instance.sign_up_form_is_visible()

    @allure.title("Verifying all fields are mandatory inside the sign up form.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_all_fields_are_mandatory(self):
        assert self.login_page_tab_instance.check_all_fields_are_mandatory()

    @allure.title("Last name input field validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_last_name_input_validation(self):
        assert self.login_page_tab_instance.last_name_mandate()

    @allure.title("Signup email input field validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_sign_up_email_input_validation(self):
        assert self.login_page_tab_instance.sign_up_email_mandate()

    @allure.title("Sign up phone input field validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_sign_up_phone_input_validation(self):
        assert self.login_page_tab_instance.sign_up_phone_mandate()

    @allure.title("Sign up password input field validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_sign_up_password_input_validation(self):
        assert self.login_page_tab_instance.sign_up_password_mandate()

    @allure.title("User DOB input field validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_user_dob_input_validation(self):
        assert self.login_page_tab_instance.sign_up_dob_input_mandate()

    @allure.title("Verifying login email input is visible on the page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_login_email_input_is_getting_displayed(self):
        assert self.login_page_tab_instance.login_email_input_exists()

    @allure.title("Verifying password is mandatory for login flow.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_password_is_mandatory_for_login(self):
        assert self.login_page_tab_instance.login_password_is_mandatory()

    @allure.title("Verifying password input box exists on the page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_password_input_exists(self):
        assert self.login_page_tab_instance.password_input_exists()

    @allure.title("Verifying user is not able to login with an invalid password.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_invalid_password_validation(self):
        assert self.login_page_tab_instance.invalid_password_error_message_validation()

    @allure.title("Verifying show password button works.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_show_password_button_works(self):
        assert self.login_page_tab_instance.show_password_button_works()

    @allure.title("Verifying remember me checkbox works.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_remember_me_checkbox_works(self):
        assert self.login_page_tab_instance.remember_me_checkbox_works()

    @allure.title("Verifying login with phone link-text is visible on the page.")
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.low
    @pytest.mark.order(1.1)
    def test_login_with_phone_text_exists(self):
        assert self.login_page_tab_instance.login_with_phone_link_text_exists()

    @allure.title("Verifying login with phone link-text works, on-clicking the text should open a phone modal.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_login_with_phone_text_works(self):
        assert self.login_page_tab_instance.login_with_phone_link_text_works()

    @allure.title("Valid login password validation.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_valid_login_password_validation(self):
        assert self.login_page_tab_instance.valid_login_password_validation()

    @allure.title("Verifying login button works.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_login_button_works(self):
        assert self.login_page_tab_instance.click_on_login_button()

    @allure.title("Verifying user is getting redirect to valid dashboard url after logging in successfully.")
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.mandatory
    @pytest.mark.order(1.1)
    def test_dashboard_url_validation(self):
        assert self.login_page_tab_instance.dashboard_url_validation()


