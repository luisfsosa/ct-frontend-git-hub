/*
 * Angelica Based Tio Sane humidity sensor simulation
 *
 * Authors: Lady Diana Muñoz, Luis Felipe Sosa
 * November 2017
 */


/* Simulation */

	/*
	 * simul(File, Format, What, Humedad, ConsumoElectricidad, ConsumoAgua, Lluvia, LC, TotC): simulation predicate
	 *
	 *    File = 'console' or a filename (suffix '.csv' or '.txt' is added if none present)
	 *    Format = 'txt' or 'csv' (format of the output)
	 *    What = 'all' or 'best' (either list all products for a context or only the best one)
	 *    Humedad, ConsumoElectricidad, ConsumoAgua, Lluvia: context (can be given or not, if not all are generated)
	 *    LC, TotC: Claims (can be given or not, if not will TotC will be maximized)
	 *
	 * Example: show on the console all products for Humedad = 2 (critica) and ConsumoElectricidad = 0 (bajo) and ConsumoAgua = 0 (bajo) and Lluvia=0 (no)
	 * simul(console, txt, all, 2, 0, 0, 0, _, _).
	 *
	 * Example: create a file data.csv with the best product for each context
	 * simul(data, csv, best, _, _, _, _, _, _).
	 * 
	 * simul(console, txt, all, 2, 0, 0, 0, [1, 0, 0, _, 1], _). je veux satisfaire le premier et le dernier claims et ne pas satisfaire ni le deuxième ni le troisieme
	 * simul(console, txt, all, 2, 0, 0, 0, _, 5). je veux satisfaire tous les claims
	 */

simul(File, Format, What, Humedad, ConsumoElectricidad, ConsumoAgua, Lluvia, LC, TotC) :-
	findall(Product, one_product(What, Humedad, ConsumoElectricidad, ConsumoAgua, Lluvia, LC, TotC, Product), LProduct),
	sort(LProduct, LProduct1),
	write_to_file(File, Format, What, LProduct1).


write_to_file(File, Format, What, LProduct) :-
	g_assign(cxt, void),
	(   File = console ->
	    Stm = user_output
	;
	    (sub_atom(File, _, _, _, '.') -> File1 = File ; format_to_atom(File1, '%s.%s', [File, Format])),
	    format('output file: %s\n', [File]),
	    open(File1, write, Stm)
	),
	(   write_header(What, best, Stm, Format),
	    member(Product, LProduct),
	    write_one(Format, What, Stm, Product),
	    fail
	;
	    close(Stm)
	).

write_header(What, What, Stm, Format) :-
	!,
	(   Format = txt ->
	    NameLSD = 'SD1...SD6',
	    NameC = 'C1,C2,...C12'
	;
	    NameLSD = ['SD1','SD2','SD3','SD4','SD5','SD6'],
	    NameC = ['C1','C2','C3','C4','C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12']
	),	    
	write_line(Format, Stm, ['MedHumedad':9, 'RegHumedad':10, 'ContrAlarma':15, 'ContrSensor':8, 'ContrRociador':12,
				 'PM', 'EE', 'TF', 'EA', 'PR', 'TotNFR',
				 NameLSD, 'TotSD',
				 NameC, 'TotC', 'ObjValue']), nl(Stm).


write_header(_, _, _, _).



write_one(Format, What, Stm, Product) :-
	Product = p(Humedad, ConsumoElectricidad, ConsumoAgua, Lluvia,LRC, LC, TotC, LNFR, TotNFR, LSD, TotSD, ObjValue),
	(   g_read(cxt, [Humedad, ConsumoElectricidad,ConsumoAgua, Lluvia]) ->
	    true
	;
	    g_assign(cxt, [Humedad, ConsumoElectricidad,ConsumoAgua, Lluvia]),
	    name_of(Humedad, [normal, alert, emergency], NameHumedad),
	    name_of(ConsumoElectricidad, [low, normal], NameConsumoElectricidad),
	   	name_of(ConsumoAgua, [low, normal], NameConsumoAgua),
	   	name_of(Lluvia, [false, true], NameLluvia),
	    write_line(Format, Stm, []),
	    write_line(Format, Stm, ['Context:', NameHumedad, NameConsumoElectricidad, NameConsumoAgua,NameLluvia]),
	    write_line(Format, Stm, []),
	    write_header(What, all, Stm, Format)
	),
	
	LRC = [MedirHumedadDia, _MedirHumedadHora, SPTopology, _FHTopology, DistributedProcessing, _SingleNodeProcessing],

	LNFR = [EnergyEfficiency, ToleranciaFallos, PredictionAccuracy],

	name_of(MedirHumedadDia, ['MedirHumedadHora', 'MedirHumedadDia'], NombreMH),
	name_of(SPTopology, ['FHTopology', 'SPTopology'], NameON),
	name_of(DistributedProcessing, ['SingleNodeProc', 'DistributedProc'], NameCFR),

	name_of(EnergyEfficiency, [--, -, =, +, ++], LevelEE),
	name_of(ToleranciaFallos, [--, -, =, +, ++], LevelFT),
	name_of(PredictionAccuracy, [--, -, =, +, ++], LevelPA),
	
	write_line(Format, Stm, [NombreMH:9, NameON:10, NameCFR:15, LevelEE:2, LevelFT:2, LevelPA:2, TotNFR:6, LSD, TotSD:5, LC, TotC:4, ObjValue:6]).


write_line(txt, Stm, LElem) :-
	member(X, LElem),
	write_txt(Stm, X),
	write(Stm, ' '),
	fail.

write_line(csv, Stm, LElem) :-
	member(X, LElem),
	(   list(X) ->
	    member(Y, X),
	    write_csv(Stm, Y)
	;
	    write_csv(Stm, X)
	),
	write(Stm, ';'),
	fail.

write_line(_, Stm, _) :-
	nl(Stm).


write_csv(Stm, X:_) :-	% ignore Width
	!,
	write_csv(Stm, X).

write_csv(Stm, X) :-
	atom(X), !,
	format(Stm, '"~a"', [X]).

write_csv(Stm, X) :-
	write(Stm, X).


write_txt(Stm, X:Width) :-
	(   atom(X),
	    format(Stm, '%-*s', [Width, X])
	;
	    integer(X),
	    format(Stm, '%*d', [Width, X])
	;
	    write(Stm, X)
	), !.

write_txt(Stm, X) :-
	    write(Stm, X).




name_of(I, L, X) :-	% act ast nth0/3, could be replaced by it
	I1 is I + 1,
	nth(I1, L, X).



/* Constraint Program */
	
one_product(What, Humedad, ConsumoElectricidad,ConsumoAgua,Lluvia, LC, TotC, Product) :-
	set_constraint(Humedad, ConsumoElectricidad, ConsumoAgua,Lluvia, LC, TotC, LRC, LNFR, LSubNFR, TotNFR, LSD, TotSD, ObjValue),
	fd_labeling([Humedad, ConsumoElectricidad, ConsumoAgua,Lluvia]), % if not given, try all possibilites
	(   What = all ->
	    fd_labeling(LRC)	% label LRC before maximization to try all possibilites
	;
	    true
	),
	fd_maximize(enumerate(LC, LRC, LNFR, LSubNFR, LSD), ObjValue),
	Product = p(Humedad, ConsumoElectricidad,ConsumoAgua, Lluvia, LRC, LC, TotC, LNFR, TotNFR, LSD, TotSD, ObjValue).
	


enumerate(LC, LRC, LNFR, LSubNFR, LSD) :-
	fd_labeling(LC),
	fd_labeling(LRC),
	fd_labeling(LNFR),
	fd_labeling(LSubNFR),
	fd_labeling(LSD).




set_constraint(Humedad, ConsumoElectricidad,ConsumoAgua,Lluvia, LC, TotC, LRC, LNFR, LSubNFR, TotNFR, LSD, TotSD, ObjValue):-

	fd_domain(ConsumoElectricidad, 0, 1),     %  0 = low, 1 = normal
	fd_domain(ConsumoAgua, 0, 1),     %  0 = low, 1 = normal
	fd_domain(Lluvia, 0, 1),     %  0 = false, 1 = true
	fd_domain(Humedad, 0, 2),     %  0 = normal, 1 = alert, 2 = emergency

	% Hard Goals (common to all product variants)

	LHG = [PredictFlooding, MedirHumedad, MeasureDepth, CalculateFlowRate, OrganizeNetwork ],
	fd_domain_bool(LHG),
	
	% Reusable Components (operationalization of the Hard Goals)
	
	LRC = [MedirHumedadDia, MedirHumedadHora, SPTopology, FHTopology, DistributedProcessing, SingleNodeProcessing],
	fd_domain_bool(LRC),

	% Non Functional Requirements
	
	LNFR = [EnergyEfficiency, ToleranciaFallos, PredictionAccuracy],
	fd_domain(LNFR, 0, 4),

	LSubNFR = [TDEnergyEfficiency, CFREnergyEfficiency, TDToleranciaFallos, ONToleranciaFallos, CFRPredictionAccuracy],
	fd_domain(LSubNFR, 0, 4),

	% Claims
	
	LC = [C1, C2, C3, C4, C5],
	fd_domain_bool(LC),

	LSD = [SD1, SD2, SD3, SD4, SD5, SD6],
	fd_domain_bool(LSD),

	% Constraints on: Hard Goals and NFR
	
	PredictFlooding #= 1,

	PredictFlooding * 4 #= MedirHumedad + OrganizeNetwork + CalculateFlowRate + MeasureDepth,

	MedirHumedad #= MedirHumedadHora + MedirHumedadDia,
	
	OrganizeNetwork #= FHTopology + SPTopology,
	
	CalculateFlowRate #= DistributedProcessing + SingleNodeProcessing,


	% Constraints on Claims (as preferences)

	C1 #<=> (MedirHumedadHora #==> TDEnergyEfficiency #=< 2) #/\ (MedirHumedadDia #==> TDEnergyEfficiency #>= 3),

	C2 #<=> (MedirHumedadHora #==> TDToleranciaFallos #>= 3) #/\ (MedirHumedadDia #==> TDToleranciaFallos #=< 0),

	C3 #<=> (FHTopology #==> ONToleranciaFallos #>= 4) #/\ (SPTopology #==> ONToleranciaFallos #=< 0),

	C4 #<=> (SingleNodeProcessing #==> CFREnergyEfficiency #>= 3) #/\ (DistributedProcessing #==> CFREnergyEfficiency #=< 0),

	C5 #<=> (SingleNodeProcessing #==> CFRPredictionAccuracy #=< 1) #/\ (DistributedProcessing #==> CFRPredictionAccuracy #>= 3),

	TotC #= C1 + C2 + C3+ C4 + C5,

	% NFR as mean of SubNFR

	EnergyEfficiency #= (TDEnergyEfficiency + 2 * CFREnergyEfficiency) // 3,
	
	ToleranciaFallos #=< (TDToleranciaFallos + ONToleranciaFallos) // 2 + 1, % + 1 to relax a bit
	ToleranciaFallos #=< (TDToleranciaFallos + ONToleranciaFallos),          % if both are 0 then ToleranciaFallos = 0

	PredictionAccuracy #= CFRPredictionAccuracy,
	
	% TotNFR #= EnergyEfficiency + ToleranciaFallos + PredictionAccuracy,
	TotNFR #= EnergyEfficiency * EnergyEfficiency + ToleranciaFallos * ToleranciaFallos + PredictionAccuracy * PredictionAccuracy,
	
	% Soft Dependencies

	SD1 #<=> (ConsumoElectricidad #= 0 #==> EnergyEfficiency #= 4),

	SD2 #<=> (ConsumoAgua #= 0 #==> EnergyEfficiency #= 4),

	SD3 #<=> (Lluvia #= 0 #==> EnergyEfficiency #= 4),

	SD4 #<=> (Humedad #= 0 #==> EnergyEfficiency #= 4), 

	SD5 #<=> (Humedad #= 2 #==> (ToleranciaFallos #= 4 #/\ PredictionAccuracy #= 4)), 

	SD6 #<=> (Humedad #= 1 #==> PredictionAccuracy #= 4), 
	
	TotSD #= SD1 + SD2 + SD3+ SD4 +SD5 + SD6,

	ObjValue #= 1000 * TotC + 100 * TotSD + TotNFR.


