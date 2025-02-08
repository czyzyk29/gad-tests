# This file contain concept decisions for GAD automation framework

## Integration of code style tools in framework

**ID**: 001  
**Status**: Decided  
**Date**: 2024/12/11  
**Context**:
We need static code analysis tools for:

- unified code standard in framework
- better code readability
- easy code formatting actions

  **Proposed solution**

- ESLint for linting coding rules for TypeScript files
- Prettier for formatting files
- Husky for running linting scripts

  **Pros**: Tools automate formatting and code style maintenance activities

  **Cons**: New tools add more complexity to solution and require maintenance

  **Decision**: Use Prettier, ESLint and Husky to provide hight code standard across framework

  **Creator**: Michał

## Introduction of New Methods Returning Page Objects in Page Objects Code <a id="introduction-of-new-methods-returning-page-objects"></a>

**ID**: 002  
**Status**: Decided  
**Date**: 2023/09/28  
**Context**: As our automation framework evolves, we are introducing a new pattern for our page objects code. This pattern involves the creation of methods within page objects that return new page objects for improved test flow and maintainability.

**Proposed solution**: Implement a pattern where methods within page objects return new page objects upon interaction. This approach enhances the organization of our test code and promotes better test maintainability.

**Pros**:

- Improved test readability - By returning new page objects, the test flow becomes more intuitive and self-explanatory, making it easier for team members to understand and contribute to test scripts.
- Enhanced page object reusability - This pattern encourages the reuse of existing page methods and objects, reducing code duplication and promoting consistency across tests.
- Modular test development - The ability to chain page object methods allows for the creation of modular and flexible test scenarios, enhancing test design.

**Cons**:

- Learning curve - Team members may need some time to become familiar with this pattern, especially if they are accustomed to different approaches.
- Initial refactoring - Adapting existing page objects to this pattern may require some refactoring effort, which should be considered during implementation.

**Decision**: Decided

**Creator**: Michał
