import React from 'react';
import { ModalSize } from '@hrbox/core/providers/ModalProvider';

// Forms
import {
    ProcessForm,
    EventAddForm,
    ActionsForm,
    EventForm,
    PointForm,
    NewOneForm,
} from '@hrbox/modules/process-maker/forms';

// Form Configs
import {
    formValidationProcess,
    handleSubmitProcess,
    initialValuesProcess,
} from '@hrbox/modules/process-maker/forms';
import {
    formValidationEventAdd,
    handleSubmitEventAdd,
    initialValuesEventAdd,
} from '@hrbox/modules/process-maker/forms';
import {
    formValidationAction,
    handleSubmitAction,
    initialValuesAction,
} from '@hrbox/modules/process-maker/forms';
import {
    formValidationEvent,
    handleSubmitEvent,
    initialValuesEvent,
} from '@hrbox/modules/process-maker/forms';
import {
    formValidationPoint,
    handleSubmitPoint,
    initialValuesPoint,
} from '@hrbox/modules/process-maker/forms';
import {
    formValidationNewOne,
    handleSubmitNewOne,
    initialValuesNewOne,
} from '@hrbox/modules/process-maker/forms/NewOneForm';

// ============================================
// Types
// ============================================

export interface BpmnElementConfig {
    formId: string;
    formComponent: React.ComponentType<any>;
    initialValues: any;
    validationSchema: any;
    handleSubmit: (values: any) => Promise<void> | void;
    modalTitle: string;
    modalSize: ModalSize | string;
    modalIcon?: React.ReactNode;
    description?: string;
}

// ============================================
// Element Type Constants
// ============================================

export const BPMN_ELEMENTS = {
    START_EVENT: 'bpmn:StartEvent',
    END_EVENT: 'bpmn:EndEvent',
    TASK: 'bpmn:Task',
    USER_TASK: 'bpmn:UserTask',
    SERVICE_TASK: 'bpmn:ServiceTask',
    SEQUENCE_FLOW: 'bpmn:SequenceFlow',
    EXCLUSIVE_GATEWAY: 'bpmn:ExclusiveGateway',
    PARALLEL_GATEWAY: 'bpmn:ParallelGateway',
    INTERMEDIATE_THROW_EVENT: 'bpmn:IntermediateThrowEvent',
    INTERMEDIATE_CATCH_EVENT: 'bpmn:IntermediateCatchEvent',
    DATA_OBJECT: 'bpmn:DataObject',
    DATA_STORE: 'bpmn:DataStore',
    POOL: 'bpmn:Participant',
    LANE: 'bpmn:Lane',
} as const;

export type BpmnElementType = typeof BPMN_ELEMENTS[keyof typeof BPMN_ELEMENTS];

// ✅ استفاده از Component Type به جای JSX Element
export const BPMN_MODAL_CONFIGS: Record<string, BpmnElementConfig> = {
    // ============================================
    // Start Event
    // ============================================
    [BPMN_ELEMENTS.START_EVENT]: {
        formId: 'start-event-form',
        formComponent: ProcessForm,
        initialValues: initialValuesProcess,
        validationSchema: formValidationProcess,
        handleSubmit: handleSubmitProcess,
        modalTitle: 'تنظیمات رویداد شروع',
        modalSize: ModalSize.LG,
        description: 'رویداد شروع، نقطه آغاز فرآیند است',
    },

    // ============================================
    // End Event
    // ============================================
    [BPMN_ELEMENTS.END_EVENT]: {
        formId: 'end-event-form',
        formComponent: EventForm,
        initialValues: initialValuesEvent,
        validationSchema: formValidationEvent,
        handleSubmit: handleSubmitEvent,
        modalTitle: 'تنظیمات رویداد پایان',
        modalSize: ModalSize.MD,
        description: 'رویداد پایان، نقطه خاتمه فرآیند است',
    },

    // ============================================
    // Task / User Task
    // ============================================
    [BPMN_ELEMENTS.TASK]: {
        formId: 'task-form',
        formComponent: EventAddForm,
        initialValues: initialValuesEventAdd,
        validationSchema: formValidationEventAdd,
        handleSubmit: handleSubmitEventAdd,
        modalTitle: 'تنظیمات وظیفه',
        modalSize: ModalSize.LG,
        description: 'وظیفه‌ای که باید انجام شود',
    },

    [BPMN_ELEMENTS.USER_TASK]: {
        formId: 'user-task-form',
        formComponent: EventAddForm,
        initialValues: initialValuesEventAdd,
        validationSchema: formValidationEventAdd,
        handleSubmit: handleSubmitEventAdd,
        modalTitle: 'تنظیمات وظیفه کاربر',
        modalSize: ModalSize.LG,
        description: 'وظیفه‌ای که توسط کاربر انجام می‌شود',
    },

    // ============================================
    // Sequence Flow
    // ============================================
    [BPMN_ELEMENTS.SEQUENCE_FLOW]: {
        formId: 'sequence-flow-form',
        formComponent: ActionsForm,
        initialValues: initialValuesAction,
        validationSchema: formValidationAction,
        handleSubmit: handleSubmitAction,
        modalTitle: 'تنظیمات جریان توالی',
        modalSize: ModalSize.MD,
        description: 'شرایط و عملیات مربوط به جریان',
    },

    // ============================================
    // Gateways
    // ============================================
    [BPMN_ELEMENTS.EXCLUSIVE_GATEWAY]: {
        formId: 'exclusive-gateway-form',
        formComponent: PointForm,
        initialValues: initialValuesPoint,
        validationSchema: formValidationPoint,
        handleSubmit: handleSubmitPoint,
        modalTitle: 'تنظیمات دروازه انحصاری',
        modalSize: ModalSize.MD,
        description: 'انتخاب یک مسیر از چند مسیر ممکن',
    },

    [BPMN_ELEMENTS.PARALLEL_GATEWAY]: {
        formId: 'parallel-gateway-form',
        formComponent: PointForm,
        initialValues: initialValuesPoint,
        validationSchema: formValidationPoint,
        handleSubmit: handleSubmitPoint,
        modalTitle: 'تنظیمات دروازه موازی',
        modalSize: ModalSize.MD,
        description: 'اجرای همزمان چند مسیر',
    },

    // ============================================
    // Data Objects
    // ============================================
    [BPMN_ELEMENTS.DATA_OBJECT]: {
        formId: 'data-object-form',
        formComponent: NewOneForm,
        initialValues: initialValuesNewOne,
        validationSchema: formValidationNewOne,
        handleSubmit: handleSubmitNewOne,
        modalTitle: 'تنظیمات شیء داده',
        modalSize: ModalSize.MD,
        description: 'داده‌هایی که در فرآیند استفاده می‌شود',
    },
};

// ============================================
// Helper Functions
// ============================================

/**
 * دریافت تنظیمات مودال برای یک نوع element
 */
export const getModalConfig = (elementType: string): BpmnElementConfig | null => {
    return BPMN_MODAL_CONFIGS[elementType] || null;
};

/**
 * بررسی اینکه آیا یک element قابل پیکربندی است
 */
export const isConfigurableElement = (elementType: string): boolean => {
    return elementType in BPMN_MODAL_CONFIGS;
};

/**
 * دریافت لیست تمام element های قابل پیکربندی
 */
export const getConfigurableElements = (): string[] => {
    return Object.keys(BPMN_MODAL_CONFIGS);
};

/**
 * دریافت عنوان مودال برای یک element
 */
export const getModalTitle = (elementType: string, t: (key: string) => string): string => {
    const config = getModalConfig(elementType);
    return config?.modalTitle || t('element_config');
};

// ============================================
// Translation Keys
// ============================================

/**
 * کلیدهای ترجمه برای عناصر مختلف
 */
export const BPMN_TRANSLATION_KEYS: Record<string, string> = {
    start: 'start_event',
    'start event': 'start_event',
    startevent: 'start_event',

    end: 'end_event',
    'end event': 'end_event',
    endevent: 'end_event',

    task: 'task',
    'append task': 'task',
    'create task': 'task',

    gateway: 'gateway',
    'exclusive gateway': 'exclusive_gateway',
    'parallel gateway': 'parallel_gateway',

    dataobject: 'data_object',
    'data object': 'data_object',
    dataobjectreference: 'data_object',

    datastore: 'data_store',
    'data store': 'data_store',
    datastorereference: 'data_store',

    pool: 'pool',
    participant: 'pool',
    lane: 'lane',
};

export const getTranslationKey = (text: string): string | undefined => {
    const normalized = text.toLowerCase().trim();

    for (const [key, value] of Object.entries(BPMN_TRANSLATION_KEYS)) {
        if (normalized.includes(key)) {
            return value;
        }
    }

    return undefined;
};

// ============================================
// Export All
// ============================================

export default {
    BPMN_ELEMENTS,
    BPMN_MODAL_CONFIGS,
    BPMN_TRANSLATION_KEYS,
    getModalConfig,
    isConfigurableElement,
    getConfigurableElements,
    getModalTitle,
    getTranslationKey,
};