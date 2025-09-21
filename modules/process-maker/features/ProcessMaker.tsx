import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modeler from 'bpmn-js/lib/Modeler';

import { ProcessModal, EventModal, NewEventModal, AddActionsModall } from './modals';

import '../app/index.css';
import { AppButton, AppInput, useModalContext } from '../../../core';

import { DocumentDownload, DocumentUpload } from 'iconsax-react';
import CustomPalette from './CustomPalette';


interface FormsValueBpmn {
  name: string;
  title?: string;
  type?: number;
  newBuiltForms?: string;
  workflowImplementation?: string;
  cartableStartType?: string;
  description?: string;
  notification?: number;
  processModal?: number;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        // <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const ProcessMaker = () => {
  const { openModal, closeModal, isModalOpen, getModalData } = useModalContext();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<Modeler | null>(null);
  const { t, i18n } = useTranslation();
  const [elementData, setElementData] = useState<Record<string, FormsValueBpmn>>({});
  const observerRef = useRef<MutationObserver | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getTranslatedTitleForEntry = useCallback(
    (el: HTMLElement) => {
      const candidates: string[] = [];
      const title = el.getAttribute('title');

      if (title) candidates.push(title);
      const aria = el.getAttribute('aria-label');

      if (aria) candidates.push(aria);
      const dataAction = el.getAttribute('data-action');

      if (dataAction) candidates.push(dataAction);
      const dataTool = el.getAttribute('data-tool');

      if (dataTool) candidates.push(dataTool);

      for (const k in el.dataset || ({} as DOMStringMap)) {
        candidates.push(String(el.dataset[k]));
      }
      const inner = (el.textContent || '').trim();

      if (inner) candidates.push(inner);

      const joined = candidates.join(' ').toLowerCase();

      if (joined.includes('start') || joined.includes('start event') || joined.includes('startevent'))
        return t('start_event');
      if (joined.includes('end') || joined.includes('end event') || joined.includes('endevent')) return t('end_event');
      if (joined.includes('task') || joined.includes('append task') || joined.includes('create task')) return t('task');
      if (joined.includes('gateway') || joined.includes('exclusive gateway') || joined.includes('parallel gateway'))
        return t('gateway');
      if (joined.includes('dataobject') || joined.includes('data object') || joined.includes('dataobjectreference'))
        return t('data_object');
      if (joined.includes('datastore') || joined.includes('data store') || joined.includes('datastorereference'))
        return t('data_store');
      if (joined.includes('pool') || joined.includes('participant')) return t('pool');

      return undefined;
    },
    [t],
  );
  // const handleDownloadAndSubmit = useCallback(async () => {
  //   if (!modelerRef.current) return;
  //
  //   try {
  //     const { xml } = await modelerRef.current.saveXML({ format: true });
  //     const blob = new Blob([xml], { type: 'application/bpmn+xml' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //
  //     a.href = url;
  //     a.download = 'HrBox.bpmn';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //     const payload = {
  //       duagramxml: xml,
  //       elements: { ...elementData },
  //       submittedat: new Date().toISOString(),
  //     };
  //     const res = JSON.stringify(payload);
  //
  //     console.log(res);
  //   } catch (err) {
  //     console.error('Error exporting XML:', err);
  //     alert('Failed to export diagram!');
  //   }
  //   localStorage.removeItem('bpmndiagram');
  //   localStorage.removeItem('bpmnElementData');
  // }, [elementData]);

  // const handleImportClick = () => {
  //   fileInputRef.current?.click();
  // };

  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //
  //   if (!file || !modelerRef.current) return;
  //
  //   const reader = new FileReader();
  //
  //   reader.onload = async (e) => {
  //     const xmlStr = e.target?.result as string;
  //
  //     try {
  //       await modelerRef.current?.importXML(xmlStr);
  //       console.log('Diagram imported successfully');
  //     } catch (err) {
  //       console.error('Error importing XML:', err);
  //       alert('Failed to import diagram!');
  //     }
  //   };
  //   reader.readAsText(file);
  //   event.target.value = '';
  // };

  const applyPaletteTranslations = useCallback(() => {
    const entries = document.querySelectorAll(
      '.djs-palette .entry, .djs-palette-entries .entry',
    ) as NodeListOf<HTMLElement>;

    if (!entries || entries.length === 0) {
      console.debug('[bpmn] applyPaletteTranslations: no .djs-palette .entry found');
    }

    let changed = 0;
    const notMatched: string[] = [];

    entries.forEach((el) => {
      const curTitle = el.getAttribute('title') || el.getAttribute('aria-label') || '';
      const newTitle = getTranslatedTitleForEntry(el);

      if (newTitle && newTitle !== curTitle) {
        el.setAttribute('title', newTitle);
        el.setAttribute('aria-label', newTitle);
        changed++;
      } else if (!newTitle) {
        notMatched.push(curTitle || (el.textContent || '').trim());
      }
    });

    console.info(`[bpmn] palette entries: total=${entries.length}, changed=${changed}`);
    if (notMatched.length) {
      console.debug('[bpmn] entries not matched (sample):', notMatched.slice(0, 10));
    }
  }, [getTranslatedTitleForEntry]);

  useEffect(() => {
    console.log('Modeler is being initialized...');
    if (!canvasRef.current) return;
    const modeler = new Modeler({
      container: canvasRef.current,
      additionalModules: [
        {
          __init__: ['customPalette'],
          customPalette: ['type', CustomPalette]
        }
      ],
      paletteProvider: null,
    });

    modelerRef.current = modeler;

    modeler.importXML(xml).then(() => {
      const palette = document.querySelector('.djs-palette');
      if (palette) {
        palette.classList.add('two-column');
      }

      const getModalForElement = (elementType: string) => {
        switch (elementType) {
          case 'bpmn:StartEvent':
            return <ProcessModal onSave={handleSave} />;
          case 'bpmn:Task':
            return <NewEventModal onSave={handleSave} />;
          case 'bpmn:SequenceFlow':
            return <AddActionsModall onSave={handleSave} />;
          case 'bpmn:EndEvent':
            return <EventModal onSave={handleSave} />;
          default:
            return null;
        }
      };
      modeler.on('element.changed', (event: any) => {
        const elementType = event.element.businessObject.$type;
        const modalComponent = getModalForElement(elementType);

        if (modalComponent) {
          openModal('confirm', elementType, modalComponent);
        }
      });

      modeler.on('element.dblclick', (event: any) => {
        const elementType = event.element.businessObject.$type;
        const modalComponent = getModalForElement(elementType);

        if (modalComponent) {
          openModal('edit', elementType, modalComponent);
        }
      });
      modeler.on('import.done', () => {
        applyPaletteTranslations();
        setTimeout(() => applyPaletteTranslations(), 150);
      });
      const obs = new MutationObserver(() => {
        applyPaletteTranslations();
      });

      observerRef.current = obs;
      obs.observe(document.body, { childList: true, subtree: true });

      return () => {
        obs.disconnect();
        modeler.destroy();
        observerRef.current = null;
      };
    });
  }, []);
  useEffect(() => {
    applyPaletteTranslations();
    const id = setTimeout(() => applyPaletteTranslations(), 120);

    return () => clearTimeout(id);
  }, [i18n.language, applyPaletteTranslations]);

  const handleCloseModal = () => {
    closeModal('confirm', 'bpmn:Task');
  };
  const handleCloseEditModal = () => {
    closeModal('edit', 'bpmn:Task');
  };

  const handleSave = (values: FormsValueBpmn, name: string) => {
    const { element } = getModalData('confirm', name) || getModalData('edit', name);

    if (!element) return;

    setElementData((prev) => ({
      ...prev,
      [element.id]: values,
    }));

    const modeling = modelerRef.current?.get('modeling');

    if (modeling && values.title) {
      modeling.updateProperties(element, { name: values.title });
    }
    handleCloseModal();
    handleCloseEditModal();
  };

  return (
    <>
      <div className="w-full h-full  p-3 border-1 border-[#0A9AD7] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.40)] dark:border-1 dark:border-[#0D4D6A] rounded-6">
        <div ref={canvasRef} className="w-[100%] bg-white rounded-6 h-full" />
        <div className={i18n.language === 'en' ? 'bpmn-toolbar-en' : 'bpmn-toolbar-fa'}>
          <AppButton
            props={{
              className: 'djs-button',
              size: 'sm',
              text: <DocumentDownload />,
            }}
          />
          <AppButton
            props={{
              className: 'djs-button',
              size: 'sm',
              text: <DocumentUpload />,
            }}
          />
        </div>
      </div>
      {/*{isModalOpen('confirm', 'bpmn:StartEvent') && openModal('confirm', 'bpmn:StartEvent', <ProcessModal/>)}*/}
      {/*{isModalOpen('edit', 'bpmn:StartEvent') && <ProcessModal />}*/}
      {/*{isModalOpen('confirm', 'bpmn:Task') && <NewEventModal />}*/}
      {/*{isModalOpen('edit', 'bpmn:Task') && <NewEventModal />}*/}
      {/*{isModalOpen('confirm', 'bpmn:SequenceFlow') && <AddActionsModall />}*/}
      {/*{isModalOpen('edit', 'bpmn:SequenceFlow') && <AddActionsModall />}*/}
      {/*{isModalOpen('confirm', 'bpmn:EndEvent') && <EventModal />}*/}
      {/*{isModalOpen('edit', 'bpmn:EndEvent') && <EventModal />}*/}
      <AppInput
        props={{
          type: 'file',
          className: 'hidden',
          accept: '.bpmn,.xml',
          ref: fileInputRef,
        }}
      />
    </>
  );
};

export default ProcessMaker;
