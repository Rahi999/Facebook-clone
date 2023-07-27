import logging
import os
import urllib.parse

from selenium.webdriver.common.by import By

from pages import BasePageClass


class LoginPageClass(BasePageClass):
    _HOME_LOGO_LOCATOR = (By.XPATH, '//img[@alt="Login Logo"]')
    _EMAIL_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Email adress"]')
    _PASSWORD_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Password"]')
    _SHOW_PASSWORD_BUTTON_LOCATOR = (By.XPATH, '//button[@type="button" and @class="chakra-button css-wubf5g"]')
    _REMEMBER_ME_CHECKBOX_LOCATOR = (By.XPATH, '//label[@class="chakra-checkbox css-1577qb8"]')
    _LOGIN_WITH_PHONE_LOCATOR_LINK_TEXT = (By.XPATH, '//p[text()="Login with phone"]')
    _LOGIN_BUTTON_LOCATOR = (By.XPATH, '//button[text()="Log in"]')
    _CREATE_YOUR_ACCOUNT_BUTTON_LOCATOR = (By.XPATH, '//button[text()="Create new account"]')
    _SIGN_UP_FORM_TEXT_LOCATOR = (By.XPATH, '//h2[text()="Sign Up"]')
    _SIGN_UP_FIRST_NAME_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="First name"]')
    _SIGN_UP_LAST_NAME_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Last name"]')
    _SIGN_UP_EMAIL_ADDRESS_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Email address"]')
    _SIGN_UP_PHONE_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Phone number"]')
    _SIGN_UP_PASSWORD_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="New password"]')
    _SIGN_UP_DOB_INPUT_LOCATOR = (By.XPATH, '//input[@type="date"]')
    _SIGN_UP_GENDER_OPTION_LOCATOR = (By.XPATH, '//span[text()="Male"]')
    _REGISTER_BUTTON_LOCATOR = (By.XPATH, '//button[text()="Register"]')
    _LOGIN_PHONE_INPUT_LOCATOR = (By.XPATH, '//input[@placeholder="Enter your phone number"]')
    _SEND_OTP_BUTTON_LOCATOR = (By.XPATH, '//button[text()="Send OTP"]')
    _OTP_INPUT_LOCATOR = (By.XPATH, '//input[@aria-label="Please enter your pin code"]')
    _VERIFY_AND_LOGIN_BUTTON_LOCATOR = (By.XPATH, '//button[text()="Verify & Login"]')

    def home_logo_exists(self):
        return self.check_page_element(self._HOME_LOGO_LOCATOR)

    def create_your_account_button_exists(self):
        return self.check_page_element(self._CREATE_YOUR_ACCOUNT_BUTTON_LOCATOR)

    def create_your_account_button_works(self):
        self.wait_it_out(2)
        return self.click_on_element(self._CREATE_YOUR_ACCOUNT_BUTTON_LOCATOR, 0)

    def sign_up_form_is_visible(self):
        return self.check_page_element(self._SIGN_UP_FORM_TEXT_LOCATOR)

    def check_all_fields_are_mandatory(self):
        first_name = os.getenv('FIRST_NAME')
        self.enter_field_input(self._SIGN_UP_FIRST_NAME_INPUT_LOCATOR, first_name)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def last_name_mandate(self):
        last_name = os.getenv('LAST_NAME')
        self.enter_field_input(self._SIGN_UP_LAST_NAME_INPUT_LOCATOR, last_name)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def sign_up_email_mandate(self):
        email = os.getenv('')
        self.enter_field_input(self._SIGN_UP_EMAIL_ADDRESS_INPUT_LOCATOR, email)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def sign_up_phone_mandate(self):
        phone = os.getenv('PHONE')
        self.enter_field_input(self._SIGN_UP_PHONE_INPUT_LOCATOR, phone)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def sign_up_password_mandate(self):
        password = os.getenv('PASSWORD')
        self.enter_field_input(self._SIGN_UP_PASSWORD_INPUT_LOCATOR, password)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def sign_up_dob_input_mandate(self):
        dob = os.getenv('DOB')
        self.enter_field_input(self._SIGN_UP_DOB_INPUT_LOCATOR, dob)
        self.wait_it_out(2)
        return self.click_on_element(self._REGISTER_BUTTON_LOCATOR, 0)

    def login_email_input_exists(self):
        self.wait_it_out(5)
        self.refresh()
        return self.check_page_element(self._EMAIL_INPUT_LOCATOR)

    def login_password_is_mandatory(self):
        email = os.getenv('EMAIL')
        self.enter_field_input(self._EMAIL_INPUT_LOCATOR, email)
        self.wait_it_out(2)
        return self.click_on_element(self._LOGIN_BUTTON_LOCATOR, 0)

    def password_input_exists(self):
        return self.check_page_element(self._PASSWORD_INPUT_LOCATOR)

    def invalid_password_error_message_validation(self):
        self.enter_field_input(self._PASSWORD_INPUT_LOCATOR, '123456')
        self.wait_it_out(2)
        return self.click_on_element(self._LOGIN_BUTTON_LOCATOR)

    def show_password_button_works(self):
        self.wait_it_out(2)
        return self.click_on_element(self._SHOW_PASSWORD_BUTTON_LOCATOR, 0)

    def remember_me_checkbox_works(self):
        self.wait_it_out(2)
        return self.click_on_element(self._REMEMBER_ME_CHECKBOX_LOCATOR, 0)

    def login_with_phone_link_text_exists(self):
        return self.check_page_element(self._LOGIN_WITH_PHONE_LOCATOR_LINK_TEXT)

    def login_with_phone_link_text_works(self):
        self.wait_it_out(2)
        return self.check_page_element(self._LOGIN_WITH_PHONE_LOCATOR_LINK_TEXT, 0)

    def enter_valid_login_phone(self):
        phone = os.getenv('PHONE')
        return self.enter_field_input(self._LOGIN_PHONE_INPUT_LOCATOR, phone)

    def click_on_send_otp_button(self):
        self.wait_it_out(2)
        return self.click_on_element(self._SEND_OTP_BUTTON_LOCATOR)

    def enter_invalid_otp(self):
        invalid_otp = os.getenv('INVALID_OTP')
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[0], 0)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[1], 1)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[2], 2)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[3], 3)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[4], 4)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, invalid_otp[5], 5)
        self.wait_it_out(2)
        return self.click_on_element(self._VERIFY_AND_LOGIN_BUTTON_LOCATOR)

    def verify_valid_otp(self):
        valid_otp = os.getenv('VALID_OTP')
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[0], 0)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[1], 1)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[2], 2)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[3], 3)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[4], 4)
        self.enter_field_input(self._OTP_INPUT_LOCATOR, valid_otp[5], 5)
        self.wait_it_out(2)
        return self.click_on_element(self._VERIFY_AND_LOGIN_BUTTON_LOCATOR)

    def dashboard_url_validation(self):
        dashboard_url = os.getenv('DASHBOARD')
        self.wait_it_out(5)
        return dashboard_url in self.get_current_url()