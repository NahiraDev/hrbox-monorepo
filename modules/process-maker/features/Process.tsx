import  { useCallback, useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useTranslation } from 'react-i18next';

import { ProcessModal, EventModal, AddEventModal, AddActionsModall } from './modals;

import './bpmnstyle.css';

interface MyFormValues {
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

export default function Bpmn() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);
  const [activeModal, setActiveModal] = useState<{
    type: string;
    element: any;
  } | null>(null);
  const [editModal, setEditModal] = useState<{
    type: string;
    element: any;
  } | null>(null);
  const { t, i18n } = useTranslation();
  const [elementData, setElementData] = useState<Record<string, MyFormValues>>({});
  const observerRef = useRef<MutationObserver | null>(null);
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
    if (!canvasRef.current) return;
    const modeler = new BpmnModeler({
      container: canvasRef.current,
    });

    modelerRef.current = modeler;

    modeler.importXML(xml);

    modeler.on('element.changed', (event: any) => {
      const element = event.element;
      const businessObject = element.businessObject;
      const type = businessObject.$type;

      if (
        [
          'bpmn:StartEvent',
          'bpmn:UserTask',
          'bpmn:ServiceTask',
          'bpmn:ParallelGateway',
          'bpmn:SubProcess',
          'bpmn:SequenceFlow',
          'bpmn:Task',
          'bpmn:ExclusiveGateway',
          'bpmn:EndEvent',
        ].includes(type)
      ) {
        setActiveModal({ type, element });
      }
    });

    modeler.on('element.dblclick', (event: any) => {
      const element = event.element;
      const businessObject = element.businessObject;
      const type = businessObject.$type;

      if (
        [
          'bpmn:StartEvent',
          'bpmn:UserTask',
          'bpmn:ServiceTask',
          'bpmn:ParallelGateway',
          'bpmn:SubProcess',
          'bpmn:SequenceFlow',
          'bpmn:Task',
          'bpmn:ExclusiveGateway',
          'bpmn:EndEvent',
        ].includes(type)
      ) {
        setEditModal({ type, element });
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
  }, []);
  useEffect(() => {
    applyPaletteTranslations();
    const id = setTimeout(() => applyPaletteTranslations(), 120);

    return () => clearTimeout(id);
  }, [i18n.language, applyPaletteTranslations]);

  const handleCloseModal = () => {
    setActiveModal(null);
  };
  const handleCloseEditModal = () => {
    setEditModal(null);
  };

  const handleSave = (values: MyFormValues) => {
    if (!activeModal) return;

    const { element } = activeModal;

    setElementData((prev) => ({
      ...prev,
      [element.id]: values,
    }));

    const modeling = modelerRef.current?.get('modeling');

    if (modeling && values.title) {
      modeling.updateProperties(element, { name: values.title });
    }

    console.log('Saved data for element:', element.id, values);
    handleCloseModal();
  };

  const currentData = activeModal ? elementData[activeModal.element.id] : undefined;

  return (
    <>
      <div className="w-full h-[600px] border p-3 border-1 border-[#0A9AD7] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.40)] dark:border-1 dark:border-[#0D4D6A] rounded-6">
        <div ref={canvasRef} className="w-[100%] bg-white h-full" />
      </div>
      {activeModal?.type === 'bpmn:StartEvent' && (
        <ProcessModal
          buttonText="Submit"
          data={currentData}
          headerText={'Add Start'}
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleSave}
        />
      )}{' '}
      {editModal?.type === 'bpmn:StartEvent' && (
        <ProcessModal
          buttonText="Submit"
          data={currentData}
          headerText={t('edit_starting_point')}
          isOpen={true}
          onClose={handleCloseEditModal}
          onSubmit={handleSave}
        />
      )}{' '}
      {activeModal?.type === 'bpmn:Task' && (
        <AddEventModal
          buttonText="Submit"
          headerText={t('Add Event')}
          isOpen={true}
          data={currentData}
          onClose={handleCloseModal}
          onSubmit={handleSave}
        />
      )}{' '}
      {editModal?.type === 'bpmn:Task' && (
        <AddEventModal
          buttonText="Submit"
          onClose={handleCloseEditModal}
          headerText={t('Edit Event')}
          isOpen={true}
        />
      )}{' '}
      {activeModal?.type === 'bpmn:SequenceFlow' && (
        <AddActionsModall
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}{' '}
      {editModal?.type === 'bpmn:SequenceFlow' && (
        <AddActionsModall
          isOpen={true}
          onClose={handleCloseEditModal}
          headerText={t('edit_action')}
        />
      )}{' '}
      {activeModal?.type === 'bpmn:EndEvent' && (
        <EventModal
          data={currentData}
          headerText="add_event"
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleSave}
        />
      )}{' '}
      {editModal?.type === 'bpmn:EndEvent' && (
        <EventModal
          data={currentData}
          headerText="edit_end_event"
          isOpen={true}
          onClose={handleCloseEditModal}
          onSubmit={handleSave}
        />
      )}
    </>
  );
}
