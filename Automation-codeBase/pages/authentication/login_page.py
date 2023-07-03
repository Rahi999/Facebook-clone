import logging
import urllib.parse

from selenium.webdriver.common.by import By

from pages import BasePageClass


class LoginPageClass(BasePageClass):
    _SIGNIN_LINK_LOCATOR = (By.LINK_TEXT, 'Sign in')
    _EMAIL_INPUT_LOCATOR = (By.ID, 'email')
    _CONTINUE_BUTTON_LOCATOR = (By.ID, 'ms_singin_email')
    _CONTINUE_WITH_GOOGLE_BUTTON_LOCATOR = (By.ID, 'ms_continue_with_google')
    _SIGNUP_LINK_LOCATOR = (By.LINK_TEXT, 'Sign Up')
    _FULLNAME_EMAIL_LOCATOR = (By.ID, 'fullname')
    _EMAIL_OR_PHONE_INPUT_LOCATOR = (By.ID, 'email')
    _PASSWORD_INPUT_LOCATOR = (By.ID, 'password')
    _FORGOT_PASSWORD_LINK_LOCATOR = (By.LINK_TEXT, 'Forgot Password?')
    _SIGNIN_BUTTON_LOCATOR = (By.ID, 'ms_singin_email')

    # def click_on_login_button(self):
    #     return self.click_on_element(self._LOGIN_BUTTON_LOCATOR)

    def click_on_signin_link(self):
        return self.click_on_element(self._SIGNIN_LINK_LOCATOR)

    def click_on_continue_button(self):
        return self.click_on_element(self._CONTINUE_BUTTON_LOCATOR)

    def test_signin_button_is_clickable(self):
        return self.click_on_element(self._SIGNIN_BUTTON_LOCATOR)
