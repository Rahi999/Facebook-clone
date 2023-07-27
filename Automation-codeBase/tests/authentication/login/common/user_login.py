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


