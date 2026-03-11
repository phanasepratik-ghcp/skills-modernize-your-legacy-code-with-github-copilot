#!/usr/bin/env node

/**
 * Student Account Management System - Node.js Implementation
 * Modernized version of the legacy COBOL application
 * 
 * This application provides a menu-driven interface for managing student
 * financial accounts, including balance inquiries, credits, and debits.
 * 
 * Architecture mirrors the original COBOL structure:
 * - Main Module (MainProgram): Menu interface and orchestration
 * - Operations Module (Operations): Business logic layer
 * - Data Module (DataProgram): Persistence layer
 */

const readline = require('readline');

// ============================================================================
// DATA LAYER (DataProgram equivalent)
// ============================================================================

/**
 * Data persistence layer for account balance management
 * Manages read/write operations for persistent storage
 */
const DataProgram = {
  // Persistent storage - initialized to 1000.00 (matches COBOL initial value)
  STORAGE_BALANCE: 1000.00,

  /**
   * READ operation - Retrieves the current balance from storage
   * @returns {number} Current account balance
   */
  read() {
    return this.STORAGE_BALANCE;
  },

  /**
   * WRITE operation - Updates the stored balance with a new value
   * @param {number} newBalance - The balance value to persist
   */
  write(newBalance) {
    this.STORAGE_BALANCE = Number(newBalance.toFixed(2));
  }
};

// ============================================================================
// OPERATIONS LAYER (Operations equivalent)
// ============================================================================

/**
 * Operations layer - implements business logic for account operations
 * Handles credit, debit, and balance inquiry operations
 */
const Operations = {
  /**
   * TOTAL operation - Display current account balance
   */
  viewBalance() {
    const balance = DataProgram.read();
    console.log(`\nCurrent balance: ${balance.toFixed(2)}`);
  },

  /**
   * CREDIT operation - Add funds to the account
   * No restrictions on credit operations - balance can grow without limit
   * @param {number} amount - The amount to credit to the account
   */
  creditAccount(amount) {
    const currentBalance = DataProgram.read();
    const newBalance = currentBalance + amount;
    DataProgram.write(newBalance);
    console.log(`\nAmount credited. New balance: ${newBalance.toFixed(2)}`);
  },

  /**
   * DEBIT operation - Withdraw funds from the account
   * KEY BUSINESS RULE: Prevents overdrafts (insufficient funds validation)
   * Debit is only successful if account has sufficient funds
   * @param {number} amount - The amount to debit from the account
   * @returns {boolean} true if debit succeeded, false if insufficient funds
   */
  debitAccount(amount) {
    const currentBalance = DataProgram.read();
    
    // Validate: Check if sufficient funds exist (key business rule)
    if (currentBalance >= amount) {
      const newBalance = currentBalance - amount;
      DataProgram.write(newBalance);
      console.log(`\nAmount debited. New balance: ${newBalance.toFixed(2)}`);
      return true;
    } else {
      console.log('\nInsufficient funds for this debit.');
      return false;
    }
  }
};

// ============================================================================
// MAIN MODULE (MainProgram equivalent)
// ============================================================================

/**
 * Main program - Provides menu-driven user interface
 * Orchestrates the menu loop and delegates to Operations layer
 */
const MainProgram = {
  continueFlag: 'YES',

  /**
   * Display the main menu options
   */
  displayMenu() {
    console.log('\n--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  },

  /**
   * Handle the user's menu choice
   * @param {number} choice - The menu option selected (1-4)
   */
  async handleChoice(choice) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise((resolve) => {
      rl.question(prompt, resolve);
    });

    switch (choice) {
      case 1:
        // View Balance
        Operations.viewBalance();
        break;

      case 2:
        // Credit Account
        const creditAmount = await question('Enter credit amount: ');
        const creditValue = parseFloat(creditAmount);
        if (isNaN(creditValue) || creditValue < 0) {
          console.log('\nInvalid amount. Please enter a valid positive number.');
        } else {
          Operations.creditAccount(creditValue);
        }
        break;

      case 3:
        // Debit Account
        const debitAmount = await question('Enter debit amount: ');
        const debitValue = parseFloat(debitAmount);
        if (isNaN(debitValue) || debitValue < 0) {
          console.log('\nInvalid amount. Please enter a valid positive number.');
        } else {
          Operations.debitAccount(debitValue);
        }
        break;

      case 4:
        // Exit
        console.log('\nExiting the program. Goodbye!');
        this.continueFlag = 'NO';
        break;

      default:
        console.log('\nInvalid choice, please select 1-4.');
    }

    rl.close();
  },

  /**
   * Main program loop - Displays menu and processes user choices
   */
  async run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise((resolve) => {
      rl.question(prompt, resolve);
    });

    while (this.continueFlag === 'YES') {
      this.displayMenu();
      const userInput = await question('Enter your choice (1-4): ');
      const userChoice = parseInt(userInput);

      await this.handleChoice(userChoice);
    }

    rl.close();
  }
};

// ============================================================================
// EXPORTS FOR TESTING
// ============================================================================

module.exports = {
  DataProgram,
  Operations,
  MainProgram
};

// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================

/**
 * Start the Student Account Management System
 */
async function main() {
  await MainProgram.run();
  process.exit(0);
}

// Only run if this file is executed directly (not imported)
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
