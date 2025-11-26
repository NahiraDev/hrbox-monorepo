import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modeler from 'bpmn-js/lib/Modeler';
import { useModal } from '@hrbox/core/hooks/useModal';
import { ModalType } from '@hrbox/core/providers/ModalProvider';
import { DocumentDownload, DocumentUpload } from 'iconsax-reactjs';
import { FormModal } from '@hrbox/uikit/components/FormModal';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { AppButton } from '@hrbox/uikit/components/AppButton';
import {
    BPMN_MODAL_CONFIGS,
    getModalConfig,
    isConfigurableElement,
    getTranslationKey,
    type BpmnElementType,
} from '../components/bpmnModalConfig';

// Import BPMN styles
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '../app/index.css'
interface ElementData {
    [elementId: string]: any;
}

interface CurrentElement {
    element: any;
    elementId: string;
    elementType: BpmnElementType;
}

const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const ProcessMaker = () => {
    const modal = useModal();
    const { t, i18n } = useTranslation();

    const canvasRef = useRef<HTMLDivElement | null>(null);
    const modelerRef = useRef<Modeler | null>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [elementData, setElementData] = useState<ElementData>({});
    const [currentElement, setCurrentElement] = useState<CurrentElement | null>(null);

    const openElementModal = useCallback(
        (element: any, mode: 'create' | 'edit' = 'edit') => {
            const elementType = element.businessObject.$type as BpmnElementType;
            const elementId = element.id;

            if (!isConfigurableElement(elementType)) {
                console.warn(`⚠️ Element type "${elementType}" is not configurable`);
                return;
            }

            const config = getModalConfig(elementType);
            if (!config) return;

            const existingData = elementData[elementId];
            setCurrentElement({ element, elementId, elementType });

            modal.open(
                mode === 'create' ? ModalType.CREATE : ModalType.EDIT,
                elementType,
                config.formComponent,
                { element, elementId, existingData },
                config.modalSize,
                config.modalTitle,
                config.modalIcon,
                {
                    closeOnBackdrop: false,
                    closeOnEsc: true,
                    onClose: () => {
                        setCurrentElement(null);
                        console.log(`🔒 Modal closed for ${elementType}`);
                    },
                }
            );

            console.log(`🎨 Opening ${mode} modal for ${elementType}`);
        },
        [modal, elementData]
    );

    const handleElementSubmit = useCallback(
        async (values: any, elementType: BpmnElementType) => {
            if (!currentElement) return;

            const config = getModalConfig(elementType);
            if (!config) return;

            try {
                setElementData((prev) => ({
                    ...prev,
                    [currentElement.elementId]: values,
                }));

                const modeling = modelerRef.current?.get('modeling');
                if (modeling && values.title) {
                    modeling.updateProperties(currentElement.element, {
                        name: values.title,
                    });
                }

                await config.handleSubmit(values);

                modal.close(ModalType.EDIT, elementType);
                modal.close(ModalType.CREATE, elementType);
                setCurrentElement(null);

                console.log('✅ Element saved:', {
                    elementId: currentElement.elementId,
                    elementType,
                });
            } catch (error) {
                console.error('❌ Error saving element:', error);
                throw error;
            }
        },
        [currentElement, modal]
    );

    const getTranslatedTitle = useCallback(
        (el: HTMLElement): string | undefined => {
            const candidates: string[] = [];
            const attrs = ['title', 'aria-label', 'data-action', 'data-tool'];

            attrs.forEach((attr) => {
                const val = el.getAttribute(attr);
                if (val) candidates.push(val);
            });

            Object.values(el.dataset || {}).forEach((val) => {
                if (val) candidates.push(val);
            });

            const text = el.textContent?.trim();
            if (text) candidates.push(text);

            const joined = candidates.join(' ').toLowerCase();
            const translationKey = getTranslationKey(joined);

            return translationKey ? t(translationKey) : undefined;
        },
        [t]
    );

    const applyPaletteTranslations = useCallback(() => {
        const entries = document.querySelectorAll(
            '.djs-palette .entry, .djs-palette-entries .entry'
        ) as NodeListOf<HTMLElement>;

        if (!entries.length) return;

        let changed = 0;
        entries.forEach((el) => {
            const newTitle = getTranslatedTitle(el);
            if (newTitle) {
                el.setAttribute('title', newTitle);
                el.setAttribute('aria-label', newTitle);
                changed++;
            }
        });

        console.info(`📝 Translated ${changed}/${entries.length} palette entries`);
    }, [getTranslatedTitle]);

    const handleDownloadAndSubmit = useCallback(async () => {
        if (!modelerRef.current) return;

        try {
            const { xml } = await modelerRef.current.saveXML({ format: true });

            const blob = new Blob([xml], { type: 'application/bpmn+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `HrBox_${Date.now()}.bpmn`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            const payload = {
                diagramXml: xml,
                elements: elementData,
                submittedAt: new Date().toISOString(),
            };

            console.log('📦 Diagram exported:', payload);

            localStorage.removeItem('bpmnDiagram');
            localStorage.removeItem('bpmnElementData');

            alert(t('export_success'));
        } catch (error) {
            console.error('❌ Export error:', error);
            alert(t('export_failed'));
        }
    }, [elementData, t]);

    const handleImportClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file || !modelerRef.current) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                const xmlStr = e.target?.result as string;
                try {
                    await modelerRef.current?.importXML(xmlStr);
                    console.log('✅ Diagram imported');
                    alert(t('import_success'));
                } catch (error) {
                    console.error('❌ Import error:', error);
                    alert(t('import_failed'));
                }
            };

            reader.readAsText(file);
            event.target.value = '';
        },
        [t]
    );

    const handleModalClose = useCallback(() => {
        setCurrentElement(null);
        console.log('🔒 Modal closed manually');
    }, []);

    // ============================================
    // Initialize Modeler - بدون CustomPalette
    // ============================================
    useEffect(() => {
        if (!canvasRef.current) return;

        console.log('🚀 Initializing BPMN Modeler...');

        // ✅ فقط Modeler پایه بدون custom modules
        const modeler = new Modeler({
            container: canvasRef.current,
        });

        modelerRef.current = modeler;

        modeler.importXML(DEFAULT_XML).then(() => {
            console.log('✅ BPMN imported successfully');

            // بررسی وجود palette
            const palette = document.querySelector('.djs-palette');
            console.log('🎨 Palette found:', !!palette);

            if (palette) {
                palette.classList.add('two-column');
                console.log('✅ Two-column class added');
            }

            // Element Changed Event
            modeler.on('element.changed', (event: any) => {
                if (event.element && !elementData[event.element.id]) {
                    console.log('🆕 New element:', event.element.businessObject.$type);
                    openElementModal(event.element, 'create');
                }
            });

            // Double Click Event
            modeler.on('element.dblclick', (event: any) => {
                console.log('👆 Double click on:', event.element.businessObject.$type);
                openElementModal(event.element, 'edit');
            });

            // Import Done Event
            modeler.on('import.done', () => {
                console.log('✅ Import done');
                applyPaletteTranslations();
                setTimeout(applyPaletteTranslations, 150);
            });

            applyPaletteTranslations();
        }).catch((err) => {
            console.error('❌ Failed to import BPMN:', err);
        });

        // Mutation Observer
        const obs = new MutationObserver(applyPaletteTranslations);
        observerRef.current = obs;
        obs.observe(document.body, { childList: true, subtree: true });

        return () => {
            console.log('🧹 Cleaning up...');
            obs.disconnect();
            modeler.destroy();
            observerRef.current = null;
            modelerRef.current = null;
        };
    }, []);

    useEffect(() => {
        applyPaletteTranslations();
        const timer = setTimeout(applyPaletteTranslations, 120);
        return () => clearTimeout(timer);
    }, [i18n.language, applyPaletteTranslations]);

    const renderModals = () => {
        return Object.entries(BPMN_MODAL_CONFIGS).map(([elementType, config]) => {
            const FormComponent = config.formComponent;

            return (
                <FormProvider
                    key={elementType}
                    formId={config.formId}
                    initialValues={currentElement?.existingData || config.initialValues}
                    validationSchema={config.validationSchema}
                    onSubmitAsync={async (values: any) => {
                        await handleElementSubmit(values, elementType as BpmnElementType);
                    }}
                >
                    <FormModal
                        type={ModalType.EDIT}
                        name={elementType}
                        submitLabel={t('save')}
                        cancelLabel={t('cancel')}
                        onClose={handleModalClose}
                    />
                    <FormModal
                        type={ModalType.CREATE}
                        name={elementType}
                        submitLabel={t('create')}
                        cancelLabel={t('cancel')}
                        onClose={handleModalClose}
                    />
                </FormProvider>
            );
        });
    };

    return (
        <>
            <div className="w-full h-full p-3 border-1 border-[#0A9AD7] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.40)] dark:border-1 dark:border-[#0D4D6A] rounded-6">
                <div ref={canvasRef} className="w-[100%] bg-white rounded-6 h-full" />

                {/* Toolbar */}
                <div className={i18n.language === 'en' ? 'bpmn-toolbar-en' : 'bpmn-toolbar-fa'}>
                    <AppButton
                        className="djs-button"
                        size="sm"
                        startContent={<DocumentDownload />}
                        onPress={handleDownloadAndSubmit}
                        content={t('download_diagram')}
                    />
                    <AppButton
                        className="djs-button"
                        size="sm"
                        startContent={<DocumentUpload />}
                        onPress={handleImportClick}
                        content={t('import_diagram')}
                    />
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".bpmn,.xml"
                onChange={handleFileChange}
            />

            {renderModals()}
        </>
    );
};

export default ProcessMaker;