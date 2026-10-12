# PERSONA · Fernanda Espinosa · Week 9
## Synthetic screenshot test · 11 October 2026
Fresh-context synthetic user Elena, 32, Mexico City coordinator, comfortable with spreadsheets, time-pressed and worried about payment. Four actual screenshots supplied by Fernanda were inspected in chronological order. The synthetic tester narrated visible screens; no clicks or real-user research are claimed. Persona is grounded in the proposed coordinator workflow, not interviews.

## Screen 1 · Initial task · 20:28:59
“Son cuatro horas, tres cotizaciones y una corrección; sí entiendo qué le pediríamos a Alex. Dice seiscientos pesos y que Alex paga cero. Veo Fondos confirmados: Sí, pero no veo quién paga ni cuándo.”
Confusion: funding lacks visible payer/timing. Severity: medium. Added fictional business payer, reserved funds, 48-hour payment term, coordinator escalation and payment despite business stopping; explicitly illustrative terms, not real transfers.

## Screen 2 · Unavailable supervisor · 20:29:57
“Ahora el supervisor dice No y enviar trabajo está gris. Buscaría asignar suplente. Pero Reanudar con condiciones revisadas sigue verde: ¿puedo reanudar aunque todavía no haya supervisor?”
Confusion: enabled resume suggests permission despite failed gate. Severity: high. Disabled resume whenever any gate or shadow reason remains; engine still enforces gates independently.

## Screen 3 · Replacement, still paused · 20:31:10
“Ahora supervisor disponible dice Sí y todo lo demás también, pero arriba sigue Pausada. Mi primera reacción es pensar que no se actualizó.”
“Leyendo el texto entiendo que asignar suplente no reanuda la tarea: tengo que hacerlo explícitamente.”
Worst confusion: mixed green conditions and paused status. Severity: high. Changed recovery explanation to: all conditions are restored but Elena must confirm resumption; named Marco as fictional replacement. Button renamed “Confirmar condiciones y reanudar tarea”.

## Screen 4 · Repeated-work warning · 20:32:10
“Entiendo la advertencia: tres tareas similares podrían estar cubriendo un trabajo continuo. No debería seguir asignándolas sin revisión humana.”
“Registrar revisión: tarea excepcional parece dejarme resolverlo con una etiqueta. ¿Qué tengo que revisar o justificar para decir que es excepcional?”
Confusion: exception lacks structured justification. Severity: high. Logged as remaining limitation: this demo is an operator-controlled simulation, not authenticated human review. Production must capture reviewer identity, justification and pathway before permitting exception. Do not use prototype for real assignment approvals.

## Fix and verification
Worst confusion corrected in source commit 848941b. JavaScript syntax check and coordinator regression suite passed. Corrected version redeployed; status verified through deployment response. Screenshot-based persona retest of revised screen is still pending. Four original captures prove visible states, not hidden behavior or a real hiring outcome.

## What remains
Ask Elena to inspect a new screenshot after failure and after replacement. Confirm she can distinguish blocked recovery from explicit permission to resume. No completed retest outcome is invented.
