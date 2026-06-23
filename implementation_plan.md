# Employee Leave Management System UI Redesign Plan

This plan details the steps required to transition the Employee Leave Management System's UI from Bootstrap to a premium, dark-themed Material UI dashboard.

## User Review Required

> [!IMPORTANT]
> - We will install `@mui/x-data-grid` for modern, responsive tables.
> - A global Material UI Dark Theme will be implemented, wrapping the application.
> - Form pages (`EmployeeForm`, `DepartmentForm`, `LeaveForm`) will be modified to render within MUI `Dialog` components rather than inline.
> - Bootstrap styling will be removed from `main.tsx` and all page/component files.

## Proposed Changes

### Dependencies

We need to install the Material UI Data Grid package:
- `@mui/x-data-grid`

---

### Global Styling & Layout

#### [NEW] [theme.ts](file:///c:/projects/Leave_Management_System/Frontend/src/theme.ts)
- Create a global MUI dark theme with premium styling:
  - Background: dark gradient values (e.g., background `#0b0f19`, paper `#161b26`).
  - Colors: Indigo primary, emerald/teal secondary, standard warning/error/info alerts.
  - Typography: Outfit/Inter font support.
  - Shape: `borderRadius` set to 12px for card and modal shapes.

#### [MODIFY] [index.html](file:///c:/projects/Leave_Management_System/Frontend/index.html)
- Add Google Fonts link for "Outfit" and "Inter".
- Change the tab title to "Leave Management Portal".

#### [MODIFY] [main.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/main.tsx)
- Wrap application with MUI `ThemeProvider` and `CssBaseline`.
- Remove imports for bootstrap CSS.

#### [MODIFY] [Layout.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/Layout.tsx)
- Reorganize main container to use MUI Box and responsive layout styling instead of bootstrap flex utilities.

#### [MODIFY] [Topbar.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/Topbar.tsx)
- Rebuild top navigation using MUI `AppBar`, `Toolbar`, and `IconButton` with matching dark-theme backgrounds.

#### [MODIFY] [Sidebar.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/Sidebar.tsx)
- Redesign the sidebar with MUI list components:
  - Top profile card showing user avatar, role, and email.
  - Active navigation highlights using dynamic styling/color filters.
  - Red Logout button at the bottom using MUI button with hover transitions.

---

### Authenticated Pages Redesign

#### [MODIFY] [LoginPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/LoginPage.tsx)
- Create a full-screen background with dark mesh/gradient.
- Add centered login card with glassmorphism (semi-transparent paper, border, shadow, backdrop-filter blur).
- Implement visibility toggle for the password field.
- Remove inline bootstrap inputs and replace with MUI text fields and button.

#### [MODIFY] [ForgotPasswordPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/ForgotPasswordPage.tsx)
- Apply the same dark glassmorphic styling to Forgot Password views.

#### [MODIFY] [ResetPasswordPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/ResetPasswordPage.tsx)
- Apply the same styling to Reset Password views.

---

### Dashboard & Profile Pages

#### [MODIFY] [DashboardPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/DashboardPage.tsx)
- Replace Bootstrap rows/cols with MUI `Grid` components.
- Redesign stats widgets as dark cards with top color borders corresponding to their metrics.

#### [MODIFY] [ProfilePage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/ProfilePage.tsx)
- Render modern profile card using MUI `Card` and `Avatar`.
- Display role badges using colored `Chip` components.
- Style employee text layouts using clean MUI `Typography`.

---

### Administrative / Employee Forms & Dialogs

#### [MODIFY] [EmployeeForm.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/EmployeeForm.tsx)
- Convert form into a responsive MUI `Dialog` wrapper.
- Utilize text fields, date pickers, select menus, and styled actions.
- Accept `open` and `onClose` props to open/close dynamically.

#### [MODIFY] [DepartmentForm.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/DepartmentForm.tsx)
- Convert to MUI `Dialog` wrapper with text fields and description textareas.

#### [MODIFY] [LeaveForm.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/components/LeaveForm.tsx)
- Convert to MUI `Dialog` wrapper with date picker fields.

---

### Data Grid Redesign

#### [MODIFY] [EmployeesPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/EmployeesPage.tsx)
- Render the `EmployeeForm` in a Dialog.
- Implement an "Add Employee" button to open the creation dialog.
- Replace HTML table with MUI `DataGrid`:
  - Standard columns: Code, Name, Email, Phone, Designation, Department, Joining Date, Actions.
  - Interactive Action controls for edit/delete.
  - Local filter search input, sorting, and pagination.

#### [MODIFY] [DepartmentsPage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/DepartmentsPage.tsx)
- Render the `DepartmentForm` in a Dialog.
- Implement an "Add Department" button.
- Replace HTML table with MUI `DataGrid`.

#### [MODIFY] [LeavePage.tsx](file:///c:/projects/Leave_Management_System/Frontend/src/pages/LeavePage.tsx)
- Render the `LeaveForm` in a Dialog.
- Implement an "Apply Leave" button.
- Replace HTML table with MUI `DataGrid`.
- Add colored status chips for APPROVED (Green), REJECTED (Red), and PENDING (Orange).

## Verification Plan

### Automated Tests & Compilation
- Run `npm run build` to verify there are no TypeScript compiler or bundle builder errors.

### Manual Verification
- Launch the development server (`npm run dev`) and test features in the browser:
  - Verify look & feel of Login and Password forms.
  - Test opening creation modals, adding entries, and updating values.
  - Verify search, pagination, and sorting inside the DataGrid views.
  - Verify active links and hover effects inside the Sidebar.
