import logging
import urllib.parse

from selenium.webdriver.common.by import By

from pages import BasePageClass


class LoginPageClass(BasePageClass):
    _SIGNIN_LINK_LOCATOR = (By.LINK_TEXT, 'Sign in')

