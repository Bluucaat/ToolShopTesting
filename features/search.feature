Feature: Item search
    The user can search various items
    on the store, using filters and
    other means to sort them.

  Background:
    Given I am on the "home" page

  Scenario Outline: Filter products by subcategory
    When I filter products by subcategory "<subcategory>"
    And I click on a product
    Then I should see the item description containing "<subcategory>"

    Examples:
      | subcategory |
      | Hammer      |
      | Wrench      |
      | Saw         |

  Scenario Outline: Filter products by price range
    When I set the minimum price to "<minimum_price>"
    And I set the maximum price to "<maximum_price>"
    Then I should see products within the "<minimum_price>" and "<maximum_price>" range

    Examples:
      | minimum_price | maximum_price |
      |             0 |           100 |
      |            10 |            20 |
      |           100 |           200 |

  Scenario: Filter products by invalid price range
    When I set the minimum price to "0"
    And I set the maximum price to "0"
    Then I should see that "there are no products found"

  Scenario Outline: Search for products by name
    When I search for "<product_name>"
    Then I should see products matching "<product_name>"

    Examples:
      | product_name |
      | claw hammer  |
      | pliers       |
      | sledgehammer |

  Scenario: Search for products by invalid name
    When I search for "qwertyuiop1234567890"
    Then I should see that "there are no products found"

  Scenario: Search is case insensitive
    When I search for "HAMMER"
    Then I should see products matching "Hammer"
