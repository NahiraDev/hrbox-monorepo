export default class CustomPalette {
  static $inject = ['palette', 'create', 'elementFactory'];

  private _palette: any;
  private _create: any;
  private _elementFactory: any;

  constructor(palette: any, create: any, elementFactory: any) {
    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;

    // ثبت provider
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const { _create, _elementFactory } = this;

    const createAction = (type: string, className: string, title: string) => ({
      group: 'custom',
      className,
      title,
      action: {
        dragstart: (event: any) => _create.start(event, _elementFactory.createShape({ type })),
        click: (event: any) => _create.start(event, _elementFactory.createShape({ type })),
      },
    });

    // فقط المان‌های دلخواه (ترتیب هم دقیقا همین)
    return {
      'circle-3': createAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-delete', 'دایره 3'),
      'circle-1': createAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-success', 'دایره 1'),
      'create.task': createAction('bpmn:Task', 'bpmn-icon-task', 'Task'),
      'circle-2': createAction('bpmn:IntermediateCatchEvent', 'bpmn-icon-intermediate-event-unsuccess', 'دایره 2'),
      'create.start-event': createAction('bpmn:StartEvent', 'bpmn-icon-start-event-none', 'Start Event'),
    };
  }
}
