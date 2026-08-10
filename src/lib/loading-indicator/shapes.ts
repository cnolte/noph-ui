const SAMPLE_COUNT = 128

const decode = (encoded: string) => {
	const radii: number[] = []
	for (let i = 0; i < SAMPLE_COUNT; i++) {
		radii.push(parseInt(encoded.slice(i * 3, i * 3 + 3), 36) / 10000)
	}
	return radii
}

export const INDETERMINATE_SHAPES = [
	// MaterialShapes.SoftBurst
	'2zl30r3533bb3ik3pq3se3s33oh3gs39u33v30a2zn31b3693co3k53qk3sk3ro3n53fb38k32t2zz2zr32037h3e23ls3r83sm3r43lj3dv37c31y2zr30032w38p3fi3ne3rq3sj3qf3jw3ch3653192zm30b33y39z3h03oo3s53sd3pk3ib3b534z30q2zl30r3533bb3ik3pq3se3s33oh3gs39u33v30a2zn31b3693co3k53qk3sk3ro3n53fb38k32t2zz2zr32037h3e23ls3r83sm3r43lj3dv37c31y2zr30032w38p3fi3ne3rq3sj3qf3jw3ch3653192zm30b33y39z3h03oo3s53sd3pk3ib3b534z30q',
	// MaterialShapes.Cookie9Sided
	'3ne3kp3hr3g53fr3gl3iq3m33ot3qq3rw3sa3rz3qx3p33mg3jc3hi3gz3hn3jn3my3pp3rn3st3t73sv3rs3pw3n73jz3i23hg3i23jz3n73pw3rs3sv3t73st3rn3pp3my3jn3hn3gz3hi3jc3mg3p33qx3rz3sa3rw3qq3ot3m33iq3gl3fr3g53hr3kp3ne3pb3qg3qw3qm3pm3nv3lc3i13fk3eg3ei3fr3ie3lc3nh3ov3pk3pk3ou3ne3l83i93fb3dr3df3e83gb3jh3lz3nr3os3p53os3nr3lz3jh3gb3e83df3dr3fb3i93l83ne3ou3pk3pk3ov3nh3lc3ie3fr3ei3eg3fk3i13lc3nv3pm3qm3qw3qg3pb',
	// MaterialShapes.Pentagon
	'3ng3lh3jw3im3ho3h23gq3gq3h03hl3ih3jp3l93n63ph3s73vc3y23zz41241e40z3zr3xr3uz3se3q73od3mx3lt3l13kk3kf3kk3l13lt3mx3od3q73se3uz3xr3zr40z41e4123zz3y23vc3s73ph3n63l93jp3ih3hl3h03gq3gq3h23ho3im3jw3lh3ng3pp3rf3se3sp3sb3r93pg3mx3jm3gc3dh3b138z37935u34r33x33e33533533f33y34s35w37b3913b43df3f93gk3hb3hl3hb3gk3f93df3b439137b35w34s33y33f33533533e33x34r35u37938z3b13dh3gc3jm3mx3pg3r93sb3sp3se3rf3pp',
	// MaterialShapes.Pill
	'3t53rz3qr3pj3o93mz3lo3kd3j13hp3gd3f13dq3cp3by3bj3be3bj3by3cp3dq3f13gd3hp3j13kd3lo3mz3o93pj3qr3rz3t53ua3vd3wc3wu3xm3yg3z83zx40k41341j41x42842f42k42l42k42f42841x41j41340k3zx3z83yg3xm3wu3wc3vd3ua3t53rz3qr3pj3o93mz3lo3kd3j13hp3gd3f13dq3cp3by3bj3be3bj3by3cp3dq3f13gd3hp3j13kd3lo3mz3o93pj3qr3rz3t53ua3vd3wc3wu3xm3yg3z83zx40k41341j41x42842f42k42l42k42f42841x41j41340k3zx3z83yg3xm3wu3wc3vd3ua',
	// MaterialShapes.Sunny
	'3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa3t63sa3pe3l73hi3ea3bj3973893973bj3ea3hi3l73pe3sa',
	// MaterialShapes.Cookie4Sided
	'2yr2z530a32b35g39l3ea3iv3mz3qk3tm3w53y73zr40v41j41r41i40u3zr3y63w43tk3qi3mw3it3e739j35f32a3092z42yr2z530a32b35g39l3ea3iv3mz3qk3tm3w53y73zr40v41j41r41i40u3zr3y63w43tk3qi3mw3it3e739j35f32a3092z42yr2z530a32b35g39l3ea3iv3mz3qk3tm3w53y73zr40v41j41r41i40u3zr3y63w43tk3qi3mw3it3e739j35f32a3092z42yr2z530a32b35g39l3ea3iv3mz3qk3tm3w53y73zr40v41j41r41i40u3zr3y63w43tk3qi3mw3it3e739j35f32a3092z4',
	// MaterialShapes.Oval
	'3ec3bw39m37i35k33s32630q2zg2yb2xc2wj2vv2vd2uz2ur2up2ur2uz2vd2vv2wj2xc2yb2zg30q32633s35k37i39m3bw3ec3gx3jn3mi3ph3sj3vn3yr41t44r47j4a14c84e14fd4g64gg4g64fd4e14c84a147j44r41t3yr3vn3sj3ph3mi3jn3gx3ec3bw39m37i35k33s32630q2zg2yb2xc2wj2vv2vd2uz2ur2up2ur2uz2vd2vv2wj2xc2yb2zg30q32633s35k37i39m3bw3ec3gx3jn3mi3ph3sj3vn3yr41t44r47j4a14c84e14fd4g64gg4g64fd4e14c84a147j44r41t3yr3vn3sj3ph3mi3jn3gx',
].map(decode)

export const DETERMINATE_SHAPES = [
	// MaterialShapes.Circle
	'3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so3so',
	// MaterialShapes.SoftBurst
	'2zl30r3533bb3ik3pq3se3s33oh3gs39u33v30a2zn31b3693co3k53qk3sk3ro3n53fb38k32t2zz2zr32037h3e23ls3r83sm3r43lj3dv37c31y2zr30032w38p3fi3ne3rq3sj3qf3jw3ch3653192zm30b33y39z3h03oo3s53sd3pk3ib3b534z30q2zl30r3533bb3ik3pq3se3s33oh3gs39u33v30a2zn31b3693co3k53qk3sk3ro3n53fb38k32t2zz2zr32037h3e23ls3r83sm3r43lj3dv37c31y2zr30032w38p3fi3ne3rq3sj3qf3jw3ch3653192zm30b33y39z3h03oo3s53sd3pk3ib3b534z30q',
].map(decode)

export const INDETERMINATE_SCALE = 0.6853
export const DETERMINATE_SCALE = 0.7917
export const VIEWBOX = 48

const CENTER = VIEWBOX / 2
const COS = Array.from({ length: SAMPLE_COUNT }, (_, i) =>
	Math.cos((2 * Math.PI * i) / SAMPLE_COUNT),
)
const SIN = Array.from({ length: SAMPLE_COUNT }, (_, i) =>
	Math.sin((2 * Math.PI * i) / SAMPLE_COUNT),
)

export const outlinePath = (from: number[], to: number[], progress: number, scale: number) => {
	const size = VIEWBOX * scale
	let d = ''
	for (let i = 0; i < SAMPLE_COUNT; i++) {
		const radius = (from[i] + (to[i] - from[i]) * progress) * size
		d +=
			(i === 0 ? 'M' : 'L') +
			(CENTER + radius * COS[i]).toFixed(2) +
			',' +
			(CENTER + radius * SIN[i]).toFixed(2)
	}
	return d + 'Z'
}
