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
//         name: "product-modal",
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
//                             name="product-modal"
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
//                             name="product-modal"
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
//                             name="product-modal"
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
//                     name="product-modal"
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
//     const modal = useCRUDModal({ name: "user" });
//
//     const handleAdd = async (values) => {
//         await api.addUser(values);
//         setUsers([...users, values]);
//         modal.close("create");
//     };
//
//     return (
//         <div>
//             <button onClick={() =>
//                 modal.openCreate(<UserForm />, "افزودن کاربر")
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
//     const modal = useModal();
//
//     const handleOpen = () => {
//         modal.open(
//             ModalType.CREATE,      // نوع
//             "my-modal",           // نام یکتا
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
//             <AppModal type={ModalType.CREATE} name="my-modal" />
//         </>
//     );
// }






//
// import { useCRUDModal } from "@hrbox/core/hooks/useCRUDModal";
// import { ModalSize } from "@hrbox/core/providers/ModalProvider";
//
// function MyComponent() {
//     const userModal = useCRUDModal({
//         name: "user-modal",
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
//                 <FormModal type="create" name="user-modal" />
//             </FormProvider>
//         </>
//     );
// }
//
//
