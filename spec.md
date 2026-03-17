# Gemora Global

## Current State
The backend uses `AccessControl.isAdmin()` checks on all admin operations. However, the admin authentication is handled entirely at the frontend level (username/password session). This means the backend caller is always anonymous, causing all admin operations (add/edit/delete products, view inquiries, manage blog posts, set content blocks) to fail with "Unauthorized" errors.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- Remove `AccessControl.isAdmin()` guards from all admin-only backend functions, since auth is enforced by the frontend session system
- Keep `AccessControl.hasPermission(#user)` checks for user profile functions as appropriate

### Remove
- Backend authorization import and mixin (no longer needed since frontend handles auth)

## Implementation Plan
1. Update `main.mo` to remove isAdmin checks from all admin functions so they work with anonymous callers (frontend already protects these routes via session)
