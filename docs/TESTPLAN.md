# Test Plan - Student Account Management System

## Overview
This test plan covers all business logic and functionality of the COBOL-based Student Account Management System. It serves as the foundation for creating comprehensive unit and integration tests in the modernized Node.js application.

## Test Case Details

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | View current account balance | Application is running; Account balance is $1,000.00 | 1. Launch the application<br>2. Select option 1 (View Balance) from the main menu<br>3. Observe the displayed balance | Menu displays "Current balance: 1000.00" | | | |
| TC-002 | Credit account with valid positive amount | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account)<br>3. Enter credit amount: 500<br>4. Observe the new balance display | Balance increases to $1,500.00; Message displays "Amount credited. New balance: 1500.00" | | | |
| TC-003 | Credit account with large amount | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account)<br>3. Enter credit amount: 9999.99<br>4. Observe the new balance display | Balance increases to $10,999.99; Message displays "Amount credited. New balance: 10999.99" | | | Validates no upper limit on balance |
| TC-004 | Credit account with decimal amount | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account)<br>3. Enter credit amount: 123.45<br>4. Verify balance is updated correctly | Balance increases to $1,123.45; Message displays "Amount credited. New balance: 1123.45" | | | Validates decimal precision handling |
| TC-005 | Debit account with valid amount (sufficient funds) | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 300<br>4. Observe the new balance display | Balance decreases to $700.00; Message displays "Amount debited. New balance: 700.00" | | | |
| TC-006 | Debit account with amount equal to current balance | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 1000<br>4. Observe the result | Balance becomes $0.00; Message displays "Amount debited. New balance: 0.00" | | | Edge case: exact balance amount |
| TC-007 | Debit account with insufficient funds (key business rule) | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 1500<br>4. Observe the error message | Error message displays "Insufficient funds for this debit."; Balance remains unchanged at $1,000.00 | | | **Critical test case** - validates overdraft protection |
| TC-008 | Debit account when balance is already low | Application is running; Current balance = $500.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 600<br>4. Observe the error message | Error message displays "Insufficient funds for this debit."; Balance remains unchanged at $500.00 | | | Validates business rule with reduced balance |
| TC-009 | Multiple sequential credits | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account); Enter 100<br>3. Select option 2 again; Enter 200<br>4. View balance to verify cumulative effect | Final balance = $1,300.00; Each credit operation succeeds; Balance is persistent | | | Validates data persistence and cumulative operations |
| TC-010 | Multiple sequential debits | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account); Enter 250<br>3. Select option 3 again; Enter 300<br>4. View balance to verify cumulative effect | Final balance = $450.00; Both debit operations succeed; Balance is persistent | | | Validates data persistence and cumulative operations |
| TC-011 | Credit and debit in sequence | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account); Enter 500<br>3. Select option 3 (Debit Account); Enter 200<br>4. View final balance | Final balance = $1,300.00 (1000 + 500 - 200); All operations succeed; Balance is persistent | | | Validates mixed operations and data persistence |
| TC-012 | Menu validation - invalid choice | Application is running and displaying menu | 1. Launch the application<br>2. Enter an invalid choice (e.g., 5 or 0)<br>3. Observe the result | Error message displays "Invalid choice, please select 1-4."; Menu is displayed again for retry | | | Validates input validation on menu selection |
| TC-013 | Menu validation - non-numeric input | Application is running and displaying menu | 1. Launch the application<br>2. Enter a non-numeric value (e.g., 'A')<br>3. Observe the system behavior | System handles gracefully; Either displays error or treats as invalid; Menu is available for retry | | | Validates robustness of input handling |
| TC-014 | Exit application cleanly | Application is running and displaying menu | 1. Launch the application<br>2. Select option 4 (Exit)<br>3. Observe the exit message | Messages display "Exiting the program. Goodbye!"; Application terminates normally; Exit code = 0 | | | |
| TC-015 | Menu loop functionality | Application is running | 1. Launch the application<br>2. Select option 1 (View Balance)<br>3. After operation completes, observe if menu is displayed again<br>4. Select option 2 (Credit Account)<br>5. After operation completes, observe menu redisplay | Menu is displayed again after each operation (except Exit); Loop continues until Exit is selected | | | Validates continuous menu loop behavior |
| TC-016 | Data persistence across operations | Application is running; Initial balance = $1,000.00 | 1. Launch the application<br>2. Credit account with $500 → balance = $1,500<br>3. View balance (option 1)<br>4. Debit account with $200 → balance = $1,300<br>5. View balance again | Each operation reads/writes correctly from DataProgram; Final balance is $1,300.00 consistent across operations; No data loss or corruption | | | Validates persistence layer integrity |
| TC-017 | Debit with amount less than available balance | Application is running; Current balance = $5,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 1000<br>4. Observe the result | Transaction succeeds; Balance becomes $4,000.00; Message displays "Amount debited. New balance: 4000.00" | | | Validates normal debit operation |
| TC-018 | Credit account with small amount (cents only) | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 2 (Credit Account)<br>3. Enter credit amount: 0.50<br>4. Verify balance | Balance increases to $1,000.50; Message displays "Amount credited. New balance: 1000.50" | | | Validates decimal/cents handling in credits |
| TC-019 | Debit account with small amount | Application is running; Current balance = $1,000.00 | 1. Launch the application<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount: 0.01<br>4. Verify balance | Balance decreases to $999.99; Message displays "Amount debited. New balance: 999.99" | | | Validates decimal/cents handling in debits |
| TC-020 | Operations module READ function | Application is running | 1. Access DataProgram READ operation via Operations module<br>2. Verify balance is retrieved correctly | Current balance is returned accurately for display and calculation | | | Tests READ operation from persistence layer |
| TC-021 | Operations module WRITE function | Application is running; Balance = $1,000.00 | 1. Perform a credit operation (WRITE via Operations)<br>2. Verify balance update succeeds<br>3. Perform another operation to confirm written value is persisted | New balance is written successfully; Subsequent operations use updated value | | | Tests WRITE operation to persistence layer |
| TC-022 | Initial account balance on startup | Application is launched for the first time | 1. Launch the application fresh (DataProgram resets to default)<br>2. Select option 1 (View Balance)<br>3. Observe the initial balance | Balance displays $1,000.00 (application default initialization value) | | | Validates initial state setup |

## Test Coverage Summary

### Business Logic Areas Covered:

1. **View Balance (TOTAL operation)**: TC-001
2. **Credit Account (CREDIT operation)**: TC-002, TC-003, TC-004, TC-009, TC-011, TC-018
3. **Debit Account (DEBIT operation)**: TC-005, TC-006, TC-017, TC-019
4. **Overdraft Protection (Key Business Rule)**: TC-007, TC-008
5. **Data Persistence**: TC-009, TC-010, TC-011, TC-016, TC-020, TC-021
6. **Menu Navigation & Validation**: TC-012, TC-013, TC-014, TC-015
7. **Decimal/Currency Handling**: TC-004, TC-018, TC-019
8. **Edge Cases**: TC-006, TC-008, TC-022

### Functional Areas Covered:

- ✅ User interface (menu display and navigation)
- ✅ Input validation (numeric entry, menu choices)
- ✅ Business logic (credit, debit, balance inquiry)
- ✅ Validation rules (overdraft prevention)
- ✅ Data persistence (READ/WRITE operations)
- ✅ Error handling (insufficient funds, invalid input)
- ✅ Mathematical operations (addition, subtraction)
- ✅ Application lifecycle (startup, loop, exit)

## Notes for Node.js Migration

When implementing unit and integration tests in the Node.js application:

1. **Mock or replace the DataProgram persistence layer** with a database connection (e.g., PostgreSQL, MongoDB)
2. **Unit tests** should isolate Operations business logic from persistence using dependency injection or mocks
3. **Integration tests** should verify the complete flow from menu selection through to data persistence
4. **Test framework recommendations**: Jest, Mocha, or Vitest for unit testing
5. **Use test fixtures** to set up known initial states (e.g., balance = $1,000.00)
6. **Consider parameterized tests** for test cases like TC-002, TC-003, TC-004 (credit with different amounts)
7. **Test async operations** thoroughly, as Node.js database calls will be asynchronous

## Stakeholder Validation

This test plan should be reviewed and validated by:
- Business stakeholders responsible for student account management
- Finance/Accounting team to confirm business rules (especially overdraft prevention)
- Operations team to verify menu flow and user interaction requirements
- Quality Assurance team before implementation in Node.js application
