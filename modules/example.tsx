// import { EnhancedProtectedRoute } from "@core/routes/EnhancedProtectedRoute";
// import { RoleSlug } from "@hrbox/core/config/theme";
// import { useRouteAccess } from "@core/hooks/useRouteAccess";
// import React from "react";
// import { useTheme } from "@hrbox/core/hooks/useTheme";
// import { returnStatement } from "storybook/internal/babel";
// import { AppButton, AppModal } from "@hrbox/uikit/components";
// import { FormProvider } from "@hrbox/core/providers/FormProvider";
//
// export function Example1() {
//   return (
//     <EnhancedProtectedRoute requiredPanel={Panel.HRBOX}>
//       <div>محتوای پنل HRBox</div>
//     </EnhancedProtectedRoute>
//   );
// }
//
// /**
//  * Example 2: Role-Based Protection
//  */
// export function Example2() {
//   return (
//     <EnhancedProtectedRoute
//       requiredPanel={Panel.HRBOX}
//       requiredRoles={[RoleSlug.ORGANIZATION]}
//     >
//       <div>فقط سازمان‌ها می‌توانند ببینند</div>
//     </EnhancedProtectedRoute>
//   );
// }
//
// /**
//  * Example 3: Permission-Based Protection
//  */
// export function Example3() {
//   return (
//     <EnhancedProtectedRoute
//       requiredPanel={Panel.HRBOX}
//       requiredPermissions={['users.create', 'users.edit']}
//     >
//       <div>فقط کسانی که مجوز ایجاد/ویرایش کاربر دارند</div>
//     </EnhancedProtectedRoute>
//   );
// }
//
// /**
//  * Example 4: Multi-Level Protection
//  */
// export function Example4() {
//   return (
//     <EnhancedProtectedRoute
//       requiredPanel={Panel.SUPER_ADMIN}
//       requiredRoles={[RoleSlug.SUPER_ADMIN]}
//       requiredPermissions={['system.manage']}
//     >
//       <div>فقط سوپر ادمین با مجوز مدیریت سیستم</div>
//     </EnhancedProtectedRoute>
//   );
// }
//
// export const ExampleModulePlugin = {
//   name: 'hrbox',
//   displayName: 'HRBox',
//
//   contents: [
//     // صفحه عمومی
//     {
//       path: '/hrbox/public',
//       component: () => <div>Public Page</div>,
//       meta: {
//         requireAuth: false,
//         title: 'صفحه عمومی',
//       },
//     },
//
//     // صفحه محافظت شده با پنل
//     {
//       path: '/hrbox/dashboard',
//       component: () => <div>Dashboard</div>,
//       meta: {
//         requireAuth: true,
//         requiredPanel: Panel.HRBOX,
//         title: 'داشبورد',
//       },
//     },
//
//     // صفحه با نقش خاص
//     {
//       path: '/hrbox/admin',
//       component: () => <div>Admin Panel</div>,
//       meta: {
//         requireAuth: true,
//         requiredPanel: Panel.HRBOX,
//         requiredRoles: [RoleSlug.ORGANIZATION],
//         title: 'پنل مدیریت',
//       },
//     },
//
//     // صفحه با مجوز خاص
//     {
//       path: '/hrbox/users',
//       component: () => <div>Users List</div>,
//       meta: {
//         requireAuth: true,
//         requiredPanel: Panel.HRBOX,
//         requiredPermissions: ['users.view', 'users.list'],
//         title: 'لیست کاربران',
//       },
//     },
//
//     // صفحه با چند سطح محافظت
//     {
//       path: '/hrbox/settings',
//       component: () => <div>Settings</div>,
//       meta: {
//         requireAuth: true,
//         requiredPanel: Panel.HRBOX,
//         requiredRoles: [RoleSlug.ORGANIZATION, RoleSlug.SUPER_ADMIN],
//         requiredPermissions: ['settings.manage'],
//         title: 'تنظیمات',
//         description: 'مدیریت تنظیمات سیستم',
//       },
//     },
//   ],
// };
//
//
// export function Example1_SimpleCheck() {
//   const { canAccessRoute } = useRouteAccess();
//
//   const canViewUsers = canAccessRoute('/hrbox/users');
//
//   return (
//     <div>
//       {canViewUsers && (
//         <button>مشاهده کاربران</button>
//       )}
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 2: بررسی دسترسی پیشرفته
//  */
// export function Example2_DetailedCheck() {
//   const { checkRouteAccess } = useRouteAccess();
//
//   const accessCheck = checkRouteAccess('/hrbox/settings');
//
//   return (
//     <div>
//       {!accessCheck.canAccess && (
//         <div className="text-danger">
//           <p>دسترسی رد شد: {accessCheck.reason}</p>
//           {accessCheck.missingRoles && (
//             <p>نقش‌های لازم: {accessCheck.missingRoles.join(', ')}</p>
//           )}
//           {accessCheck.missingPermissions && (
//             <p>مجوزهای لازم: {accessCheck.missingPermissions.join(', ')}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 3: نمایش منوی فیلتر شده
//  */
// export function Example3_FilteredMenu() {
//   const { accessibleRoutes, currentPanel } = useRouteAccess();
//
//   // فقط routes مربوط به پنل فعلی که کاربر دسترسی دارد
//   const menuItems = accessibleRoutes.filter(
//     (route) => route.meta?.requiredPanel === currentPanel
//   );
//
//   return (
//     <nav>
//       {menuItems.map((route) => (
//         <a key={route.path} href={route.path}>
//           {route.meta?.title || route.path}
//         </a>
//       ))}
//     </nav>
//   );
// }
//
// /**
//  * ✅ مثال 4: دکمه‌های اکشن
//  */
// export function Example4_ActionButtons() {
//   const { canAccessRoute } = useRouteAccess();
//
//   const canEdit = canAccessRoute('/hrbox/users/edit');
//   const canDelete = canAccessRoute('/hrbox/users/delete');
//   const canCreate = canAccessRoute('/hrbox/users/create');
//
//   return (
//     <div className="flex gap-2">
//       {canCreate && <button>ایجاد</button>}
//       {canEdit && <button>ویرایش</button>}
//       {canDelete && <button>حذف</button>}
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 5: نمایش لیست routes بر اساس پنل
//  */
// export function Example5_PanelRoutes() {
//   const { filterRoutesByPanel } = useRouteAccess();
//
//   const hrboxRoutes = filterRoutesByPanel(Panel.HRBOX);
//
//   return (
//     <div>
//       <h2>Routes در پنل HRBox</h2>
//       <ul>
//         {hrboxRoutes.map((route) => (
//           <li key={route.path}>{route.path}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 6: Guard برای Conditional Rendering
//  */
// export function Example6_ConditionalContent() {
//   const { canAccessRoute, checkRouteAccess } = useRouteAccess();
//
//   const adminAccess = checkRouteAccess('/hrbox/admin');
//
//   if (!canAccessRoute('/hrbox/dashboard')) {
//     return <div>شما دسترسی به این بخش را ندارید</div>;
//   }
//
//   return (
//     <div>
//       <h1>داشبورد</h1>
//
//       {adminAccess.canAccess && (
//         <div className="admin-panel">
//           <h2>پنل مدیریت</h2>
//         </div>
//       )}
//
//       {!adminAccess.canAccess && (
//         <div className="text-neutral-500">
//           <p>برای دسترسی به پنل مدیریت نیاز به نقش {adminAccess.missingRoles?.join(', ')} دارید</p>
//         </div>
//       )}
//     </div>
//   );
// }
//
// export function Example1_SimpleToggle() {
//   const { isDark, toggleMode } = useAdvancedTheme();
//
//   return (
//     <button onClick={toggleMode}>
//       {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
//     </button>
//   );
// }
//
// /**
//  * ✅ مثال 2: تغییر پنل
//  */
// export function Example2_PanelSwitch() {
//   const { panel, setPanel } = useAdvancedTheme();
//
//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => setPanel('hrlink')}
//         className={panel === 'hrlink' ? 'active' : ''}
//       >
//         HRLink
//       </button>
//       <button
//         onClick={() => setPanel('hrbox')}
//         className={panel === 'hrbox' ? 'active' : ''}
//       >
//         HRBox
//       </button>
//       <button
//         onClick={() => setPanel('super-admin')}
//         className={panel === 'super-admin' ? 'active' : ''}
//       >
//         Super Admin
//       </button>
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 3: Color Picker
//  */
// export function Example3_ColorPicker() {
//   const { getColor, setColor } = useAdvancedTheme();
//
//   const primaryColor = getColor('primary.500') || '#0A9AD7';
//
//   return (
//     <div>
//       <label>Primary Color:</label>
//       <input
//         type="color"
//         value={primaryColor}
//         onChange={(e) => setColor('primary.500', e.target.value)}
//       />
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 4: Font Selector
//  */
// export function Example4_FontSelector() {
//   const { getFont, setFont } = useAdvancedTheme();
//
//   const bodyFont = getFont('body') || 'Inter';
//
//   return (
//     <div>
//       <label>Body Font:</label>
//       <select
//         value={bodyFont}
//         onChange={(e) => setFont('body', e.target.value)}
//       >
//         <option value="Inter">Inter</option>
//         <option value="Roboto">Roboto</option>
//         <option value="Open Sans">Open Sans</option>
//       </select>
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 5: Spacing Editor
//  */
// export function Example5_SpacingEditor() {
//   const { getSpacing, setSpacing } = useAdvancedTheme();
//
//   const spacing = {
//     xs: getSpacing('xs') || '4px',
//     sm: getSpacing('sm') || '8px',
//     md: getSpacing('md') || '16px',
//     lg: getSpacing('lg') || '24px',
//   };
//
//   return (
//     <div className="space-y-2">
//       {Object.entries(spacing).map(([key, value]) => (
//         <div key={key} className="flex items-center gap-2">
//           <label className="w-16">{key}:</label>
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setSpacing(key, e.target.value)}
//             className="w-24"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 6: Undo/Redo Controls
//  */
// export function Example6_UndoRedo() {
//   const { canUndo, canRedo, undo, redo, reset } = useAdvancedTheme();
//
//   return (
//     <div className="flex gap-2">
//       <button onClick={undo} disabled={!canUndo}>
//         ↶ Undo
//       </button>
//       <button onClick={redo} disabled={!canRedo}>
//         ↷ Redo
//       </button>
//       <button onClick={reset}>
//         🔄 Reset
//       </button>
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 7: Import/Export
//  */
// export function Example7_ImportExport() {
//   const { exportTheme, importThemeFromJSON } = useAdvancedTheme();
//
//   const handleExport = () => {
//     const json = exportTheme();
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'theme.json';
//     a.click();
//   };
//
//   const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const json = event.target?.result as string;
//         importThemeFromJSON(json);
//       };
//       reader.readAsText(file);
//     }
//   };
//
//   return (
//     <div className="flex gap-2">
//       <button onClick={handleExport}>
//         📥 Export Theme
//       </button>
//       <label className="cursor-pointer px-4 py-2 bg-primary text-white rounded-lg">
//         📤 Import Theme
//         <input
//           type="file"
//           accept=".json"
//           onChange={handleImport}
//           className="hidden"
//         />
//       </label>
//     </div>
//   );
// }
//
// /**
//  * ✅ مثال 8: Custom CSS Editor
//  */
// export function Example8_CustomCSS() {
//   const { setCustomCSS, config } = useTheme();
//
//   const [css, setCss] = React.useState(config?.customCSS || '');
//
//   const handleApply = () => {
//     setCustomCSS(css);
//   };
//
//   return (
//     <div>
//       <label>Custom CSS:</label>
//       <textarea
//         value={css}
//         onChange={(e) => setCss(e.target.value)}
//         rows={10}
//         className="w-full font-mono text-sm"
//         placeholder=".custom-class { color: red; }"
//       />
//       <button onClick={handleApply}>Apply CSS</button>
//     </div>
//   );
// }
//
//
// // ✅ Context Mode (Global Modal)
// returnStatement(
//   <>
//     <AppModal.Body>
//       <FormProvider>
//         <AwardForm />
//       </FormProvider>
//     </AppModal.Body>
//     <AppModal.Footer>
//       <AppButton props={{ content: 'Close' }} />
//     </AppModal.Footer>
//     <AppModal
//       title="ایجاد جایزه"
//       isDirty={isDirty}
//       formError={error}
//       onSubmit={handleSubmit}
//     >
//       <Input />
//     </AppModal>
//   </>
// )
//
//
// ✅ بجای AppDeleteModal
// const { openModal } = useModalContext();
//
// const handleDelete = () => {
//   openModal(
//     'delete',
//     'user-delete',
//     <AppModal
//       title="حذف کاربر"
//       icon={<DeleteIcon />}
//       isDirty={true}
//       onSubmit={() => {
//         // Delete logic With Api
//         closeModal('delete', 'user-delete');
//       }}
//       onCancel={() => closeModal('delete', 'user-delete')}
//       submitLabel="حذف"
//       cancelLabel="انصراف"
//     >
//       <p>آیا مطمئن هستید؟</p>
//     </AppModal>,
//     null,
//     'md'
//   );
// };

//
// export const HRBoxPlugin: ModulePlugin = {
//   name: 'hrbox',
//   routes: [
//     {
//       path: '/hrbox/dashboard',
//       component: DashboardPage,
//       meta: {
//         requireAuth: true,
//         requiredRoles: [RoleSlug.ORGANIZATION],
//       },
//     },
//   ],
// };
