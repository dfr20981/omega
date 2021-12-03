<?php
    require_once '../Controller/dbExec.php';
	require_once ('Classes/PHPExcel.php');
	
    $query="CALL sp_viewKits();";
        //echo $query;
    $msg=dbExec::exec($query);//clase read QueryExe
        

    $js= json_decode($msg);
    $kits=$js->kits;
    $arts=$js->arts;

    // Crea un nuevo objeto PHPExcel
    $objPHPExcel = new PHPExcel();

     $estilo = array(
        'font'  => array(
            'bold'  => true,
            'size'  => 12,
            'name'  => 'Arial Narrow',
            'color' => array('rgb' => 'FFFFFF')
        ));
    
    $ini=1; 
    $objPHPExcel->getDefaultStyle()->getFont()->setName('Arial');
    $objPHPExcel->getDefaultStyle()->getFont()->setSize(8);

    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(120);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
        

    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);


    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('A'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('B'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('C'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('D'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('E'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray($estilo);
    $objPHPExcel->getActiveSheet()->getStyle('F'.$ini)->applyFromArray(
        array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '0070C0')
            )
        )
    );

    $objPHPExcel->getActiveSheet()->setCellValue('A'.$ini,'#');
    $objPHPExcel->getActiveSheet()->setCellValue('B'.$ini,'KIT');
    $objPHPExcel->getActiveSheet()->setCellValue('C'.$ini,'Articulo');
    $objPHPExcel->getActiveSheet()->setCellValue('D'.$ini,'Marca');
    $objPHPExcel->getActiveSheet()->setCellValue('E'.$ini,'Modelo');
    $objPHPExcel->getActiveSheet()->setCellValue('F'.$ini,'Categoria');

    $ini=$ini+1;
    $num=1;
    $limt1=count($kits);
    $limt2=count($arts);
    /**/
    for ($d=0; $d<$limt1; $d++) {    
        $id_kit=$kits[$d];
        for ($f=0; $f<$limt2; $f++) {    
            $obj=$arts[$f];
            if($id_kit==$obj->id_kit){
                /**/
                $objPHPExcel->getActiveSheet()->getStyle('D'.($ini))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('E'.($ini))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('F'.($ini))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                

                $objPHPExcel->getActiveSheet()->setCellValue('A'.($ini),''.$num);
                $objPHPExcel->getActiveSheet()->setCellValue('B'.($ini),''.$obj->id_kit);
                $objPHPExcel->getActiveSheet()->setCellValue('C'.($ini),'('.$obj->id_art.') '.$obj->descr);
                $objPHPExcel->getActiveSheet()->setCellValue('D'.($ini),$obj->marca);
                $objPHPExcel->getActiveSheet()->setCellValue('E'.($ini),$obj->modelo);
                $objPHPExcel->getActiveSheet()->setCellValue('F'.($ini),$obj->tipo);
                
                $ini=$ini+1;
                $num=$num+1;
            }
        } 
    }
    /**/
    

    // Nombramos la hoja
    $objPHPExcel->getActiveSheet()->setTitle("Lista de Kits");

    // Elegimos en que hoja se abre el Excel
    $objPHPExcel->setActiveSheetIndex(0);

    // indicar que se envia un archivo de Excel.
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="catalogo_omega_Lista_Kits.xlsx"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter->save('php://output');


    #echo 'listo';
	
	exit;
	
/**/
?>

