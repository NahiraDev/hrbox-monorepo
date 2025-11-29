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
// ===============================================
// مثال پیشرفته: استفاده از FormMode و Cache
// ===============================================
//
// import React, { useState, useEffect } from "react";
// import { FormProvider, useFormContext } from "@hrbox/core/providers/FormProvider";
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { FormModal } from "./FormModal";
// import { ModalSize } from "@hrbox/core/providers/ModalProvider";
// import { FormMode } from "@hrbox/uikit/components/types";
// import * as Yup from "yup";
//
// // فرم محصول که با FormMode کار میکنه
// const ProductFormContent = () => {
//     const {
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         formMode,
//         setFormMode
//     } = useFormContext();
//
//     const isViewMode = formMode === FormMode.VIEW;
//     const isEditMode = formMode === FormMode.EDIT;
//
//     return (
//         <div className="space-y-4">
//             {/* نمایش وضعیت فرم */}
//             <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                 <p className="text-sm text-blue-700">
//                     وضعیت فرم: <strong>{formMode}</strong>
//                 </p>
//                 {isEditMode && (
//                     <button
//                         type="button"
//                         onClick={() => setFormMode(FormMode.VIEW)}
//                         className="mt-2 text-xs text-blue-600 underline"
//                     >
//                         تبدیل به حالت مشاهده
//                     </button>
//                 )}
//                 {isViewMode && (
//                     <button
//                         type="button"
//                         onClick={() => setFormMode(FormMode.EDIT)}
//                         className="mt-2 text-xs text-blue-600 underline"
//                     >
//                         تبدیل به حالت ویرایش
//                     </button>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-2 font-medium">نام محصول</label>
//                 <input
//                     name="name"
//                     value={values.name || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={isViewMode}
//                     className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     placeholder="نام محصول"
//                 />
//                 {errors.name && touched.name && (
//                     <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-2 font-medium">قیمت (تومان)</label>
//                 <input
//                     name="price"
//                     type="number"
//                     value={values.price || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={isViewMode}
//                     className="w-full p-2 border rounded disabled:bg-gray-100"
//                     placeholder="قیمت"
//                 />
//                 {errors.price && touched.price && (
//                     <p className="text-red-500 text-sm mt-1">{errors.price}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-2 font-medium">دسته‌بندی</label>
//                 <select
//                     name="category"
//                     value={values.category || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={isViewMode}
//                     className="w-full p-2 border rounded disabled:bg-gray-100"
//                 >
//                     <option value="">انتخاب کنید</option>
//                     <option value="electronics">الکترونیک</option>
//                     <option value="clothing">پوشاک</option>
//                     <option value="food">مواد غذایی</option>
//                     <option value="books">کتاب</option>
//                 </select>
//                 {errors.category && touched.category && (
//                     <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-2 font-medium">موجودی</label>
//                 <input
//                     name="stock"
//                     type="number"
//                     value={values.stock || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={isViewMode}
//                     className="w-full p-2 border rounded disabled:bg-gray-100"
//                     placeholder="تعداد موجودی"
//                 />
//             </div>
//
//             <div>
//                 <label className="block mb-2 font-medium">توضیحات</label>
//                 <textarea
//                     name="description"
//                     value={values.description || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={isViewMode}
//                     className="w-full p-2 border rounded disabled:bg-gray-100"
//                     rows={4}
//                     placeholder="توضیحات محصول..."
//                 />
//             </div>
//
//             <div className="flex items-center gap-2">
//                 <input
//                     name="featured"
//                     type="checkbox"
//                     checked={values.featured || false}
//                     onChange={handleChange}
//                     disabled={isViewMode}
//                     className="w-4 h-4 disabled:cursor-not-allowed"
//                 />
//                 <label>محصول ویژه</label>
//             </div>
//         </div>
//     );
// };
//
// // Validation Schema
// const productValidationSchema = Yup.object({
//     name: Yup.string()
//         .required("نام محصول الزامی است")
//         .min(3, "نام باید حداقل 3 کاراکتر باشد"),
//     price: Yup.number()
//         .required("قیمت الزامی است")
//         .positive("قیمت باید مثبت باشد")
//         .min(1000, "قیمت باید حداقل 1000 تومان باشد"),
//     category: Yup.string().required("دسته‌بندی الزامی است"),
//     stock: Yup.number()
//         .required("موجودی الزامی است")
//         .min(0, "موجودی نمی‌تواند منفی باشد"),
// });
//
// // کامپوننت اصلی
// export const AdvancedProductManagement = () => {
//     const [products, setProducts] = useState([
//         {
//             id: 1,
//             name: "لپ‌تاپ ایسوس",
//             price: 25000000,
//             category: "electronics",
//             stock: 10,
//             description: "لپ‌تاپ با کیفیت",
//             featured: true,
//         },
//         {
//             id: 2,
//             name: "کتاب برنامه‌نویسی",
//             price: 150000,
//             category: "books",
//             stock: 50,
//             description: "آموزش React",
//             featured: false,
//         },
//     ]);
//
//     const productModal = useCRUDModal({
//         name: "product-modals",
//         size: ModalSize.XL,
//     });
//
//     // افزودن محصول
//     const handleAddProduct = async (values: any) => {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//
//         const newProduct = {
//             id: products.length + 1,
//             ...values,
//         };
//         setProducts([...products, newProduct]);
//         productModal.close("create");
//     };
//
//     // ویرایش محصول
//     const handleEditProduct = async (values: any) => {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//
//         setProducts(products.map(p =>
//             p.id === values.id ? values : p
//         ));
//         productModal.close("edit");
//     };
//
//     // حذف محصول
//     const handleDeleteProduct = async (values: any) => {
//         await new Promise(resolve => setTimeout(resolve, 500));
//
//         setProducts(products.filter(p => p.id !== values.id));
//         productModal.close("delete");
//     };
//
//     return (
//         <div className="p-8 max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800">مدیریت محصولات</h1>
//                     <p className="text-sm text-gray-600 mt-1">
//                         با قابلیت Cache و FormMode
//                     </p>
//                 </div>
//                 <button
//                     onClick={() =>
//                         productModal.openCreate(
//                             <ProductFormContent />,
//                             "افزودن محصول جدید",
//                             <span>📦</span>
//                         )
//                     }
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                 >
//                     + افزودن محصول
//                 </button>
//             </div>
//
//             {/* Grid محصولات */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {products.map((product) => (
//                     <div
//                         key={product.id}
//                         className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                     >
//                         <div className="flex justify-between items-start mb-3">
//                             <div>
//                                 <h3 className="font-semibold text-lg text-gray-800">
//                                     {product.name}
//                                     {product.featured && (
//                                         <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                       ⭐ ویژه
//                     </span>
//                                     )}
//                                 </h3>
//                                 <p className="text-sm text-gray-600 mt-1">
//                                     دسته: {product.category}
//                                 </p>
//                             </div>
//                             <div className="text-right">
//                                 <p className="font-bold text-blue-600">
//                                     {product.price.toLocaleString()} تومان
//                                 </p>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                     موجودی: {product.stock}
//                                 </p>
//                             </div>
//                         </div>
//
//                         <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                             {product.description}
//                         </p>
//
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() =>
//                                     productModal.openView(
//                                         <ProductFormContent />,
//                                         product,
//                                         "مشاهده محصول",
//                                         <span>👁️</span>
//                                     )
//                                 }
//                                 className="flex-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
//                             >
//                                 مشاهده
//                             </button>
//
//                             <button
//                                 onClick={() =>
//                                     productModal.openEdit(
//                                         <ProductFormContent />,
//                                         product,
//                                         "ویرایش محصول",
//                                         <span>✏️</span>
//                                     )
//                                 }
//                                 className="flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
//                             >
//                                 ویرایش
//                             </button>
//
//                             <button
//                                 onClick={() =>
//                                     productModal.openDelete(
//                                         <div className="text-center">
//                                             <p className="text-red-600 mb-4">
//                                                 آیا از حذف "{product.name}" اطمینان دارید؟
//                                             </p>
//                                         </div>,
//                                         product,
//                                         "حذف محصول",
//                                         <span>🗑️</span>
//                                     )
//                                 }
//                                 className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
//                             >
//                                 حذف
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {/* مودال افزودن با Cache */}
//             <FormProvider
//                 formId="add-product-form"
//                 initialValues={{
//                     name: "",
//                     price: 0,
//                     category: "",
//                     stock: 0,
//                     description: "",
//                     featured: false,
//                 }}
//                 validationSchema={productValidationSchema}
//                 onSubmitAsync={handleAddProduct}
//                 enableCache={true}
//                 clearCacheOnSubmit={true}
//                 cacheExpiryMs={60 * 60 * 1000} // 1 ساعت
//             >
//                 {(formContext) => (
//                     <>
//                         {/* نمایش اطلاعات Cache */}
//                         {formContext.dirty && (
//                             <div className="fixed bottom-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg z-50">
//                                 <p className="text-sm">
//                                     ⚠️ تغییرات ذخیره نشده در Cache موجود است
//                                 </p>
//                                 <button
//                                     onClick={() => formContext.clearCache()}
//                                     className="text-xs underline mt-1"
//                                 >
//                                     پاک کردن Cache
//                                 </button>
//                             </div>
//                         )}
//
//                         <FormModal
//                             type="create"
//                             name="product-modals"
//                             submitLabel="ذخیره محصول"
//                             cancelLabel="انصراف"
//                         />
//                     </>
//                 )}
//             </FormProvider>
//
//             {/* مودال ویرایش */}
//             <FormProvider
//                 formId="edit-product-form"
//                 initialValues={{
//                     id: 0,
//                     name: "",
//                     price: 0,
//                     category: "",
//                     stock: 0,
//                     description: "",
//                     featured: false,
//                 }}
//                 validationSchema={productValidationSchema}
//                 onSubmitAsync={handleEditProduct}
//             >
//                 {(formContext) => {
//                     // تنظیم FormMode به EDIT
//                     useEffect(() => {
//                         formContext.setFormMode(FormMode.EDIT);
//                     }, []);
//
//                     return (
//                         <FormModal
//                             type="edit"
//                             name="product-modals"
//                             submitLabel="بروزرسانی"
//                             cancelLabel="انصراف"
//                         />
//                     );
//                 }}
//             </FormProvider>
//
//             {/* مودال مشاهده */}
//             <FormProvider
//                 formId="view-product-form"
//                 initialValues={{}}
//             >
//                 {(formContext) => {
//                     // تنظیم FormMode به VIEW
//                     useEffect(() => {
//                         formContext.setFormMode(FormMode.VIEW);
//                     }, []);
//
//                     return (
//                         <FormModal
//                             type="view"
//                             name="product-modals"
//                             hideFooter={true}
//                         />
//                     );
//                 }}
//             </FormProvider>
//
//             {/* مودال حذف */}
//             <FormProvider
//                 formId="delete-product-form"
//                 initialValues={{ id: 0 }}
//                 onSubmitAsync={handleDeleteProduct}
//             >
//                 <FormModal
//                     type="delete"
//                     name="product-modals"
//                     submitLabel="تایید حذف"
//                     cancelLabel="انصراف"
//                 />
//             </FormProvider>
//         </div>
//     );
// };














// import { useState } from "react";
// import { FormProvider } from "@hrbox/core/providers/FormProvider";
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { FormModal } from "./FormModal";
// import * as Yup from "yup";
//
// // Validation
// const schema = Yup.object({
//     name: Yup.string().required("نام الزامی است"),
//     email: Yup.string().email().required("ایمیل الزامی است"),
// });
//
// // Form Content
// const UserForm = () => {
//     const { values, errors, touched, handleChange, handleBlur } =
//         useFormContext();
//
//     return (
//         <div className="space-y-4">
//             <div>
//                 <input
//                     name="name"
//                     value={values.name || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                 />
//                 {errors.name && touched.name && (
//                     <p className="text-red-500">{errors.name}</p>
//                 )}
//             </div>
//             <div>
//                 <input
//                     name="email"
//                     type="email"
//                     value={values.email || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                 />
//                 {errors.email && touched.email && (
//                     <p className="text-red-500">{errors.email}</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// // Main Component
// function UserManager() {
//     const [users, setUsers] = useState([]);
//     const modals = useCRUDModal({ name: "user" });
//
//     const handleAdd = async (values) => {
//         await api.addUser(values);
//         setUsers([...users, values]);
//         modals.close("create");
//     };
//
//     return (
//         <div>
//             <button onClick={() =>
//                 modals.openCreate(<UserForm />, "افزودن کاربر")
//             }>
//                 افزودن
//             </button>
//
//             <FormProvider
//                 formId="add-user"
//                 initialValues={{ name: "", email: "" }}
//                 validationSchema={schema}
//                 onSubmitAsync={handleAdd}
//             >
//                 <FormModal type="create" name="user" />
//             </FormProvider>
//         </div>
//     );
// }

















// import { useModal } from "@hrbox/core/hooks/useModal";
// import { ModalType } from "@hrbox/core/providers/ModalProvider";
//
// function MyComponent() {
//     const modals = useModal();
//
//     const handleOpen = () => {
//         modals.open(
//             ModalType.CREATE,      // نوع
//             "my-modals",           // نام یکتا
//             <MyContent />,        // محتوا
//             { userId: 1 },        // دیتا (optional)
//             "md",                 // سایز
//             "عنوان",              // تایتل
//             <Icon />              // آیکون
//         );
//     };
//
//     return (
//         <>
//             <button onClick={handleOpen}>باز کن</button>
//             <AppModal type={ModalType.CREATE} name="my-modals" />
//         </>
//     );
// }






//
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { ModalSize } from "@hrbox/core/providers/ModalProvider";
//
// function MyComponent() {
//     const userModal = useCRUDModal({
//         name: "user-modals",
//         size: ModalSize.LG
//     });
//
//     return (
//         <>
//             <button onClick={() =>
//                 userModal.openCreate(
//                     <AddUserForm />,
//                     "افزودن کاربر",
//                     <UserIcon />
//                 )
//             }>
//                 افزودن
//             </button>
//
//             <FormProvider
//                 formId="add-user"
//                 initialValues={{ name: "", email: "" }}
//                 onSubmitAsync={handleSubmit}
//             >
//                 <FormModal type="create" name="user-modals" />
//             </FormProvider>
//         </>
//     );
// }
//
//









// import React, { useState } from "react";
// import { FormProvider, useFormContext } from "@hrbox/core/providers/FormProvider";
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { useModal } from "@hrbox/core/hooks/useModal";
// import { FormModal } from "./FormModal";
// import { AppModal } from "./AppModal";
// import { ModalType, ModalSize } from "@hrbox/core/providers/ModalProvider";
// import * as Yup from "yup";
//
// // ============================================
// // تست 1: مودال ساده بدون فرم
// // ============================================
// export const SimpleModalTest = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [message, setMessage] = useState("");
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">تست 1: مودال ساده</h3>
//             <button
//                 onClick={() => setIsOpen(true)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//                 باز کردن
//             </button>
//
//             {isOpen && (
//                 <AppModal
//                     title="پیام ساده"
//                     icon={<span>💬</span>}
//                     size="sm"
//                     onSubmit={() => {
//                         alert(`پیام: ${message}`);
//                         setIsOpen(false);
//                     }}
//                     onCancel={() => setIsOpen(false)}
//                 >
//                     <AppModal.Header />
//                     <AppModal.Body>
//                         <input
//                             type="text"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="پیام خود را بنویسید"
//                             className="w-full p-2 border rounded"
//                         />
//                     </AppModal.Body>
//                     <AppModal.Footer />
//                 </AppModal>
//             )}
//         </div>
//     );
// };
//
// // ============================================
// // تست 2: مودال با useModal
// // ============================================
// const CustomContent = () => {
//     return (
//         <div className="space-y-3">
//             <p>این محتوای سفارشی است</p>
//             <div className="p-3 bg-blue-50 rounded">
//                 <p className="text-sm">اطلاعات مهم در اینجا نمایش داده می‌شود</p>
//             </div>
//         </div>
//     );
// };
//
// export const UseModalTest = () => {
//     const modals = useModal();
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">تست 2: استفاده از useModal</h3>
//             <button
//                 onClick={() =>
//                     modals.open(
//                         "custom",
//                         "test-modals",
//                         <CustomContent />,
//                         undefined,
//                         "md",
//                         "مودال تستی",
//                         <span>⚙️</span>
//                     )
//                 }
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//                 باز کردن
//             </button>
//
//             <AppModal type="custom" name="test-modals" />
//         </div>
//     );
// };
//
// // ============================================
// // تست 3: CRUD کامل با FormProvider
// // ============================================
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
// }
//
// const UserForm = () => {
//     const { values, errors, touched, handleChange, handleBlur } = useFormContext<User>();
//
//     return (
//         <div className="space-y-4">
//             <div>
//                 <label className="block mb-1 font-medium">نام</label>
//                 <input
//                     name="name"
//                     value={values.name || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="w-full p-2 border rounded"
//                     placeholder="نام کامل"
//                 />
//                 {errors.name && touched.name && (
//                     <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-1 font-medium">ایمیل</label>
//                 <input
//                     name="email"
//                     type="email"
//                     value={values.email || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="w-full p-2 border rounded"
//                     placeholder="email@example.com"
//                 />
//                 {errors.email && touched.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block mb-1 font-medium">نقش</label>
//                 <select
//                     name="role"
//                     value={values.role || ""}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="">انتخاب کنید</option>
//                     <option value="admin">مدیر</option>
//                     <option value="user">کاربر</option>
//                     <option value="guest">مهمان</option>
//                 </select>
//                 {errors.role && touched.role && (
//                     <p className="text-red-500 text-sm mt-1">{errors.role}</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// const userSchema = Yup.object({
//     name: Yup.string().required("نام الزامی است").min(3, "حداقل 3 کاراکتر"),
//     email: Yup.string().required("ایمیل الزامی است").email("ایمیل نامعتبر"),
//     role: Yup.string().required("نقش الزامی است"),
// });
//
// export const CRUDModalTest = () => {
//     const [users, setUsers] = useState<User[]>([
//         { id: 1, name: "علی احمدی", email: "ali@test.com", role: "admin" },
//     ]);
//
//     const userModal = useCRUDModal({
//         name: "user-crud",
//         size: ModalSize.LG,
//     });
//
//     const handleAdd = async (values: User) => {
//         await new Promise((r) => setTimeout(r, 1000));
//         setUsers([...users, { ...values, id: Date.now() }]);
//         userModal.close("create");
//     };
//
//     const handleEdit = async (values: User) => {
//         await new Promise((r) => setTimeout(r, 1000));
//         setUsers(users.map((u) => (u.id === values.id ? values : u)));
//         userModal.close("edit");
//     };
//
//     const handleDelete = async (values: User) => {
//         await new Promise((r) => setTimeout(r, 500));
//         setUsers(users.filter((u) => u.id !== values.id));
//         userModal.close("delete");
//     };
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">تست 3: CRUD کامل</h3>
//
//             <button
//                 onClick={() =>
//                     userModal.openCreate(<UserForm />, "افزودن کاربر", <span>👤</span>)
//                 }
//                 className="px-4 py-2 bg-purple-500 text-white rounded mb-4"
//             >
//                 + افزودن کاربر
//             </button>
//
//             <div className="space-y-2">
//                 {users.map((user) => (
//                     <div
//                         key={user.id}
//                         className="p-3 bg-gray-50 rounded flex justify-between items-center"
//                     >
//                         <div>
//                             <div className="font-medium">{user.name}</div>
//                             <div className="text-sm text-gray-600">{user.email}</div>
//                             <div className="text-xs text-gray-500">{user.role}</div>
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() =>
//                                     userModal.openEdit(<UserForm />, user, "ویرایش کاربر")
//                                 }
//                                 className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//                             >
//                                 ویرایش
//                             </button>
//                             <button
//                                 onClick={() =>
//                                     userModal.openDelete(
//                                         <div>
//                                             <p className="text-red-600 font-medium mb-2">
//                                                 آیا از حذف "{user.name}" مطمئن هستید؟
//                                             </p>
//                                             <p className="text-sm text-gray-600">
//                                                 این عمل قابل بازگشت نیست
//                                             </p>
//                                         </div>,
//                                         user,
//                                         "حذف کاربر"
//                                     )
//                                 }
//                                 className="px-2 py-1 bg-red-500 text-white rounded text-sm"
//                             >
//                                 حذف
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {/* مودال افزودن */}
//             <FormProvider
//                 formId="add-user"
//                 initialValues={{ name: "", email: "", role: "" } as User}
//                 validationSchema={userSchema}
//                 onSubmitAsync={handleAdd}
//             >
//                 <FormModal type="create" name="user-crud" />
//             </FormProvider>
//
//             {/* مودال ویرایش */}
//             <FormProvider
//                 formId="edit-user"
//                 initialValues={{ id: 0, name: "", email: "", role: "" }}
//                 validationSchema={userSchema}
//                 onSubmitAsync={handleEdit}
//             >
//                 <FormModal type="edit" name="user-crud" />
//             </FormProvider>
//
//             {/* مودال حذف */}
//             <FormProvider
//                 formId="delete-user"
//                 initialValues={{ id: 0 } as User}
//                 onSubmitAsync={handleDelete}
//             >
//                 <FormModal type="delete" name="user-crud" submitLabel="تایید حذف" />
//             </FormProvider>
//         </div>
//     );
// };
//
// // ============================================
// // تست 4: چند مودال همزمان
// // ============================================
// export const MultiModalTest = () => {
//     const modals = useModal();
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">تست 4: چند مودال همزمان</h3>
//             <button
//                 onClick={() =>
//                     modals.open(
//                         "first",
//                         "modals-1",
//                         <div>
//                             <p className="mb-4">این مودال اول است</p>
//                             <button
//                                 onClick={() =>
//                                     modals.open(
//                                         "second",
//                                         "modals-2",
//                                         <div>
//                                             <p>این مودال دوم است (روی مودال اول)</p>
//                                         </div>,
//                                         undefined,
//                                         "sm",
//                                         "مودال دوم"
//                                     )
//                                 }
//                                 className="px-3 py-1 bg-green-500 text-white rounded"
//                             >
//                                 باز کردن مودال دوم
//                             </button>
//                         </div>,
//                         undefined,
//                         "md",
//                         "مودال اول"
//                     )
//                 }
//                 className="px-4 py-2 bg-orange-500 text-white rounded"
//             >
//                 باز کردن مودال اول
//             </button>
//
//             <AppModal type="first" name="modals-1" />
//             <AppModal type="second" name="modals-2" />
//         </div>
//     );
// };
//
// // ============================================
// // تست 5: مودال با خطا
// // ============================================
// export const ErrorModalTest = () => {
//     const modals = useModal();
//
//     const handleSubmitWithError = async () => {
//         // شبیه‌سازی خطا
//         throw new Error("خطایی در عملیات رخ داد!");
//     };
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">تست 5: مدیریت خطا</h3>
//             <button
//                 onClick={() =>
//                     modals.open(
//                         "error",
//                         "error-modals",
//                         <div>
//                             <p>این عملیات خطا خواهد داشت</p>
//                         </div>,
//                         undefined,
//                         "sm",
//                         "تست خطا"
//                     )
//                 }
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//                 باز کردن
//             </button>
//
//             <FormProvider
//                 formId="error-test"
//                 initialValues={{}}
//                 onSubmitAsync={handleSubmitWithError}
//             >
//                 <FormModal type="error" name="error-modals" submitLabel="ارسال (خطا)" />
//             </FormProvider>
//         </div>
//     );
// };
//
// // ============================================
// // کامپوننت اصلی تست
// // ============================================
// export const ModalSystemTestSuite = () => {
//     return (
//         <div className="p-8 space-y-6 max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6">🧪 تست کامل Modal System</h1>
//
//             <SimpleModalTest />
//             <UseModalTest />
//             <CRUDModalTest />
//             <MultiModalTest />
//             <ErrorModalTest />
//
//             <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
//                 <h4 className="font-bold text-green-800 mb-2">✅ چک‌لیست تست:</h4>
//                 <ul className="text-sm text-green-700 space-y-1">
//                     <li>✓ باز و بسته شدن مودال</li>
//                     <li>✓ انیمیشن‌ها</li>
//                     <li>✓ فرم‌ها و validation</li>
//                     <li>✓ مدیریت خطا</li>
//                     <li>✓ چند مودال همزمان</li>
//                     <li>✓ ESC برای بستن</li>
//                     <li>✓ کلیک روی backdrop</li>
//                     <li>✓ دکمه‌های submit/cancel</li>
//                     <li>✓ Loading state</li>
//                 </ul>
//             </div>
//         </div>
//     );
// };
//
// export default ModalSystemTestSuite;













/**
 * 🚀 مثال‌های پیشرفته Modal System
 *
 * نمایش استفاده از قابلیت‌های جدید:
 * - closeOnBackdrop
 * - closeOnEsc
 * - onClose callback
 * - updateModalData
 * - getAllOpenModals
 */
//
// import React, { useState } from "react";
// import { FormProvider, useFormContext } from "@hrbox/core/providers/FormProvider";
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { useModal } from "@hrbox/core/hooks/useModal";
// import { FormModal } from "./FormModal";
// import { AppModal } from "./AppModal";
// import { useModalContext } from "@hrbox/core/providers/ModalProvider";
// import * as Yup from "yup";
//
// // ============================================
// // مثال 1: مودال با onClose callback
// // ============================================
// export const ModalWithCallbackExample = () => {
//     const modals = useModal();
//     const [logs, setLogs] = useState<string[]>([]);
//
//     const addLog = (message: string) => {
//         setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
//     };
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">مودال با Callback</h3>
//
//             <button
//                 onClick={() =>
//                     modals.open(
//                         "callback",
//                         "test",
//                         <div className="p-4">محتوای مودال</div>,
//                         undefined,
//                         "md",
//                         "تست Callback",
//                         undefined,
//                         {
//                             onClose: () => addLog("مودال بسته شد"),
//                             closeOnEsc: true,
//                             closeOnBackdrop: true
//                         }
//                     )
//                 }
//                 className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
//             >
//                 باز کردن
//             </button>
//
//             {/* لاگ‌ها */}
//             <div className="bg-gray-100 p-3 rounded max-h-40 overflow-auto">
//                 <p className="text-xs font-bold mb-2">Event Logs:</p>
//                 {logs.map((log, i) => (
//                     <p key={i} className="text-xs text-gray-700">{log}</p>
//                 ))}
//             </div>
//
//             <AppModal type="callback" name="test" />
//         </div>
//     );
// };
//
// // ============================================
// // مثال 2: مودال که نمیشه با backdrop یا ESC بست
// // ============================================
// export const UnclosableModalExample = () => {
//     const modals = useModal();
//     const [step, setStep] = useState(1);
//
//     const openWizard = () => {
//         setStep(1);
//         modals.open(
//             "wizard",
//             "setup-wizard",
//             <div className="space-y-4">
//                 <div className="p-4 bg-blue-50 rounded">
//                     <p className="font-medium mb-2">مرحله {step} از 3</p>
//                     <p className="text-sm text-gray-600">
//                         این مودال فقط با دکمه بعدی/قبلی قابل تغییر است
//                     </p>
//                 </div>
//
//                 <div className="flex gap-2 justify-between">
//                     <button
//                         onClick={() => setStep(s => Math.max(1, s - 1))}
//                         disabled={step === 1}
//                         className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//                     >
//                         قبلی
//                     </button>
//
//                     {step < 3 ? (
//                         <button
//                             onClick={() => setStep(s => s + 1)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded"
//                         >
//                             بعدی
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() => modals.close("wizard", "setup-wizard")}
//                             className="px-4 py-2 bg-green-500 text-white rounded"
//                         >
//                             اتمام
//                         </button>
//                     )}
//                 </div>
//             </div>,
//             { step },
//             "md",
//             "راهنمای نصب",
//             undefined,
//             {
//                 closeOnBackdrop: false,  // ❌ نمیشه با کلیک روی backdrop بست
//                 closeOnEsc: false,        // ❌ نمیشه با ESC بست
//             }
//         );
//     };
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">مودال غیرقابل بستن</h3>
//             <p className="text-sm text-gray-600 mb-3">
//                 این مودال فقط با دکمه اتمام بسته میشه
//             </p>
//
//             <button
//                 onClick={openWizard}
//                 className="px-4 py-2 bg-purple-500 text-white rounded"
//             >
//                 شروع راهنما
//             </button>
//
//             <AppModal type="wizard" name="setup-wizard" />
//         </div>
//     );
// };
//
// // ============================================
// // مثال 3: بروزرسانی Data مودال
// // ============================================
// interface CounterData {
//     count: number;
//     history: number[];
// }
//
// const CounterModal = () => {
//     const modals = useModal();
//     const data = modals.getData("counter", "live-counter") as CounterData || { count: 0, history: [] };
//
//     const increment = () => {
//         const newCount = data.count + 1;
//         modals.updateData("counter", "live-counter", {
//             count: newCount,
//             history: [...data.history, newCount]
//         });
//     };
//
//     const decrement = () => {
//         const newCount = data.count - 1;
//         modals.updateData("counter", "live-counter", {
//             count: newCount,
//             history: [...data.history, newCount]
//         });
//     };
//
//     return (
//         <div className="space-y-4">
//             <div className="text-center">
//                 <p className="text-5xl font-bold text-blue-600">{data.count}</p>
//             </div>
//
//             <div className="flex gap-2 justify-center">
//                 <button
//                     onClick={decrement}
//                     className="px-6 py-2 bg-red-500 text-white rounded-lg text-xl"
//                 >
//                     -
//                 </button>
//                 <button
//                     onClick={increment}
//                     className="px-6 py-2 bg-green-500 text-white rounded-lg text-xl"
//                 >
//                     +
//                 </button>
//             </div>
//
//             {data.history.length > 0 && (
//                 <div className="bg-gray-100 p-3 rounded">
//                     <p className="text-xs font-bold mb-2">تاریخچه:</p>
//                     <p className="text-xs text-gray-600">
//                         {data.history.join(' → ')}
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export const UpdateDataModalExample = () => {
//     const modals = useModal();
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">بروزرسانی Data مودال</h3>
//
//             <button
//                 onClick={() =>
//                     modals.open(
//                         "counter",
//                         "live-counter",
//                         <CounterModal />,
//                         { count: 0, history: [] },
//                         "sm",
//                         "شمارنده زنده"
//                     )
//                 }
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//                 باز کردن شمارنده
//             </button>
//
//             <AppModal type="counter" name="live-counter" />
//         </div>
//     );
// };
//
// // ============================================
// // مثال 4: مدیریت چند مودال با useCRUDModal
// // ============================================
// export const MultipleCRUDModalsExample = () => {
//     const userModal = useCRUDModal({
//         name: "user",
//         size: "lg",
//         defaultOptions: {
//             onClose: () => console.log("User modals closed")
//         }
//     });
//
//     const productModal = useCRUDModal({
//         name: "product",
//         size: "xl",
//         defaultOptions: {
//             closeOnBackdrop: false  // محصولات مهم‌تر هستن، نباید سهواً بسته بشن
//         }
//     });
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">چند CRUD Modal همزمان</h3>
//
//             <div className="space-y-2">
//                 <button
//                     onClick={() =>
//                         userModal.openCreate(
//                             <div>فرم کاربر</div>,
//                             "افزودن کاربر"
//                         )
//                     }
//                     className="block w-full px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                     افزودن کاربر
//                 </button>
//
//                 <button
//                     onClick={() =>
//                         productModal.openCreate(
//                             <div>فرم محصول</div>,
//                             "افزودن محصول"
//                         )
//                     }
//                     className="block w-full px-4 py-2 bg-green-500 text-white rounded"
//                 >
//                     افزودن محصول
//                 </button>
//             </div>
//
//             <FormProvider formId="add-user" initialValues={{}}>
//                 <FormModal type="create" name="user" />
//             </FormProvider>
//
//             <FormProvider formId="add-product" initialValues={{}}>
//                 <FormModal type="create" name="product" />
//             </FormProvider>
//         </div>
//     );
// };
//
// // ============================================
// // مثال 5: نمایش تعداد مودال‌های باز
// // ============================================
// export const ModalCounterExample = () => {
//     const { getModalCount, getAllOpenModals, closeAllModals } = useModalContext();
//     const modals = useModal();
//     const openModals = getAllOpenModals();
//
//     return (
//         <div className="p-4 border rounded">
//             <h3 className="font-bold mb-2">مدیریت مودال‌های باز</h3>
//
//             <div className="mb-4 p-3 bg-gray-100 rounded">
//                 <p className="font-medium">تعداد مودال‌های باز: {getModalCount()}</p>
//                 {openModals.length > 0 && (
//                     <ul className="mt-2 text-sm space-y-1">
//                         {openModals.map((m, i) => (
//                             <li key={i} className="text-gray-700">
//                                 • {m.type} - {m.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//
//             <div className="space-y-2">
//                 <button
//                     onClick={() =>
//                         modals.open("test", "modals-1", <div>مودال 1</div>, undefined, "sm", "مودال 1")
//                     }
//                     className="block w-full px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                     باز کردن مودال 1
//                 </button>
//
//                 <button
//                     onClick={() =>
//                         modals.open("test", "modals-2", <div>مودال 2</div>, undefined, "sm", "مودال 2")
//                     }
//                     className="block w-full px-4 py-2 bg-green-500 text-white rounded"
//                 >
//                     باز کردن مودال 2
//                 </button>
//
//                 <button
//                     onClick={() =>
//                         modals.open("test", "modals-3", <div>مودال 3</div>, undefined, "sm", "مودال 3")
//                     }
//                     className="block w-full px-4 py-2 bg-purple-500 text-white rounded"
//                 >
//                     باز کردن مودال 3
//                 </button>
//
//                 <button
//                     onClick={closeAllModals}
//                     disabled={getModalCount() === 0}
//                     className="block w-full px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
//                 >
//                     بستن همه ({getModalCount()})
//                 </button>
//             </div>
//
//             <AppModal type="test" name="modals-1" />
//             <AppModal type="test" name="modals-2" />
//             <AppModal type="test" name="modals-3" />
//         </div>
//     );
// };
//
// // ============================================
// // کامپوننت اصلی
// // ============================================
// export const AdvancedModalFeatures = () => {
//     return (
//         <div className="p-8 space-y-6 max-w-5xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6">🚀 قابلیت‌های پیشرفته Modal</h1>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <ModalWithCallbackExample />
//                 <UnclosableModalExample />
//                 <UpdateDataModalExample />
//                 <MultipleCRUDModalsExample />
//             </div>
//
//             <ModalCounterExample />
//         </div>
//     );
// };

// // پیش‌فرض: فعال
// // میتونی غیرفعالش کنی:
// modals.open(type, name, component, data, size, title, icon, {
//     closeOnEsc: false
// });
//
// // پیش‌فرض: فعال
// // میتونی غیرفعالش کنی:
// modals.open(type, name, component, data, size, title, icon, {
//     closeOnBackdrop: false
// });
//
// modals.open(type, name, component, data, size, title, icon, {
//     onClose: () => {
//         console.log('Modal closed!');
//         // پاک کردن state، ارسال analytics، و غیره
//     }
// });
//
//
// // بروزرسانی data مودال بدون بستن و باز کردن مجدد
// modals.updateData('create', 'user-modals', { step: 2 });
//
// const modals = useCRUDModal({
//     name: 'user',
//     size: 'lg',
//     defaultOptions: {
//         closeOnBackdrop: true,
//         closeOnEsc: true,
//         onClose: () => console.log('Modal closed')
//     }
// });
//
// // متدهای جدید:
// modals.openConfirm(component, data, title, icon);
// modals.updateData({ step: 2 });
// modals.getData();
// modals.isOpen(); // بدون type - چک میکنه هر type ای باز هست
// modals.close(); // بدون type - همه type ها رو میبنده







//
// const userModal = useModalActions('create', 'user-modals');
//
// userModal.open(component, data, size, title, icon);
// userModal.close();
// userModal.isOpen; // boolean
// userModal.getData();
// userModal.updateData(newData);