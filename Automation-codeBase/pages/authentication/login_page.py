import logging
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

    _SIGNIN_LINK_LOCATOR = (By.LINK_TEXT, 'Sign in')

