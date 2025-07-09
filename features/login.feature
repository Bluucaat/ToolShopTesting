Feature: User Login

  Background:
    Given I am on the "login" page

  Scenario Outline: Successful Login with Valid Credetils
    When I enter a valid "<email>" and "<password>"
    And I click the login Button
    Then I should see the "<name>" displayed

    Examples:
      | email                                | password  | name     |
      | admin@practicesoftwaretesting.com    | welcome01 | John Doe |
      | customer@practicesoftwaretesting.com | welcome01 | Jane Doe |

  Scenario Outline: Unsuccessful Login with Invalid Credetials
    When I enter an invalid "<email>" and "<password>"
    And I click the login Button
    Then I should see an "<error_message>"
    And I should remain on the login page

    Examples:
      | email                             | password | error_message              |
      | admin@practicesoftwaretesting.com |          | Password is required       |
      |                                   |      123 | Email is required          |
      | admin@practicesoftwaretesting.com |        1 | Password length is invalid |
      | admin@practicesoftwaretesting.com |      123 | Invalid email or password  |
      | admin                             |      123 | Email format is invalid    |
